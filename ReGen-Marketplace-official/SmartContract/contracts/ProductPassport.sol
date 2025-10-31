// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./AccessControl.sol";

/**
 * @title ProductPassport
 * @dev Manages NFT minting, ownership transfer, and product information for the ReGen Marketplace
 * This contract represents physical products as NFTs on Hedera Token Service (HTS)
 */
contract ProductPassport is AccessControl {
    // Product information structure
    struct Product {
        uint256 tokenId;
        string metadataURI; // IPFS link containing product details
        address manufacturer;
        string serialNumber;
        address currentOwner;
        uint256 mintTimestamp;
        uint256 totalTransfers;
        bool exists;
    }
    
    // Ownership transfer history
    struct TransferRecord {
        uint256 tokenId;
        address from;
        address to;
        uint256 timestamp;
        string reason; // e.g., "RESALE", "RECYCLING", "REPAIR_TRANSFER"
    }
    
    // Mapping from token ID to product
    mapping(uint256 => Product) public products;
    
    // Mapping from token ID to array of transfer records
    mapping(uint256 => TransferRecord[]) public transferHistory;
    
    // Counter for token IDs
    uint256 private _tokenIdCounter;
    
    // Mapping to track token ownership
    mapping(uint256 => address) private _owners;
    
    // Mapping from owner address to array of token IDs
    mapping(address => uint256[]) private _ownedTokens;
    
    // Balance tracking
    mapping(address => uint256) private _balances;
    
    // Events
    event ProductMinted(
        uint256 indexed tokenId,
        address indexed manufacturer,
        string serialNumber,
        uint256 timestamp
    );
    
    event OwnershipTransferred(
        uint256 indexed tokenId,
        address indexed from,
        address indexed to,
        uint256 timestamp,
        string reason
    );
    
    // Modifiers
    modifier onlyManufacturer() {
        require(
            hasRole(MANUFACTURER_ROLE, msg.sender),
            "ProductPassport: Only manufacturer can mint products"
        );
        _;
    }
    
    modifier validToken(uint256 tokenId) {
        require(products[tokenId].exists, "ProductPassport: Token does not exist");
        _;
    }
    
    /**
     * @dev Constructor
     */
    constructor() {
        _tokenIdCounter = 1; // Start token IDs from 1
    }
    
    /**
     * @dev Mint a new product NFT
     * @param metadataURI IPFS link containing product details and sustainability credentials
     * @param manufacturer Address of the manufacturer
     * @param serialNumber Unique serial number of the product
     * @return tokenId The ID of the newly minted token
     */
    function mintProductNFT(
        string memory metadataURI,
        address manufacturer,
        string memory serialNumber
    ) public onlyManufacturer returns (uint256) {
        require(bytes(metadataURI).length > 0, "ProductPassport: Invalid metadata URI");
        require(manufacturer != address(0), "ProductPassport: Invalid manufacturer address");
        require(bytes(serialNumber).length > 0, "ProductPassport: Invalid serial number");
        
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        products[tokenId] = Product({
            tokenId: tokenId,
            metadataURI: metadataURI,
            manufacturer: manufacturer,
            serialNumber: serialNumber,
            currentOwner: manufacturer,
            mintTimestamp: block.timestamp,
            totalTransfers: 0,
            exists: true
        });
        
        _owners[tokenId] = manufacturer;
        _ownedTokens[manufacturer].push(tokenId);
        _balances[manufacturer]++;
        
        emit ProductMinted(tokenId, manufacturer, serialNumber, block.timestamp);
        
        return tokenId;
    }
    
    /**
     * @dev Transfer ownership of a product NFT
     * @param tokenId The ID of the token to transfer
     * @param newOwner Address of the new owner
     * @param reason Reason for the transfer (e.g., "RESALE", "RECYCLING")
     */
    function transferOwnership(
        uint256 tokenId,
        address newOwner,
        string memory reason
    ) public validToken(tokenId) {
        require(newOwner != address(0), "ProductPassport: Cannot transfer to zero address");
        require(_owners[tokenId] == msg.sender, "ProductPassport: Not the owner of this token");
        require(newOwner != _owners[tokenId], "ProductPassport: Cannot transfer to current owner");
        
        address previousOwner = _owners[tokenId];
        
        // Update ownership
        _owners[tokenId] = newOwner;
        products[tokenId].currentOwner = newOwner;
        products[tokenId].totalTransfers++;
        
        // Update balances
        _balances[previousOwner]--;
        _balances[newOwner]++;
        
        // Remove token from previous owner's list
        _removeTokenFromOwnerList(previousOwner, tokenId);
        
        // Add token to new owner's list
        _ownedTokens[newOwner].push(tokenId);
        
        // Record transfer history
        transferHistory[tokenId].push(TransferRecord({
            tokenId: tokenId,
            from: previousOwner,
            to: newOwner,
            timestamp: block.timestamp,
            reason: reason
        }));
        
        emit OwnershipTransferred(tokenId, previousOwner, newOwner, block.timestamp, reason);
    }
    
    /**
     * @dev Get complete product information
     * @param tokenId The ID of the token
     * @return product The product information
     * @return transfers The transfer history
     * @return ownershipHistory Array of transfer records
     */
    function getProductInfo(uint256 tokenId)
        public
        view
        validToken(tokenId)
        returns (
            Product memory product,
            uint256 transfers,
            TransferRecord[] memory ownershipHistory
        )
    {
        product = products[tokenId];
        transfers = transferHistory[tokenId].length;
        ownershipHistory = transferHistory[tokenId];
    }
    
    /**
     * @dev Get the owner of a specific token
     * @param tokenId The ID of the token
     * @return owner The owner address
     */
    function ownerOf(uint256 tokenId) public view validToken(tokenId) returns (address) {
        return _owners[tokenId];
    }
    
    /**
     * @dev Get the balance of an address
     * @param owner The address to check
     * @return balance The number of tokens owned
     */
    function balanceOf(address owner) public view returns (uint256) {
        require(owner != address(0), "ProductPassport: Zero address not valid");
        return _balances[owner];
    }
    
    /**
     * @dev Get all tokens owned by an address
     * @param owner The address to check
     * @return tokenIds Array of token IDs owned
     */
    function tokensOfOwner(address owner) public view returns (uint256[] memory) {
        require(owner != address(0), "ProductPassport: Zero address not valid");
        return _ownedTokens[owner];
    }
    
    /**
     * @dev Get total number of products minted
     * @return total Total number of products
     */
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter - 1;
    }
    
    /**
     * @dev Internal function to remove a token from owner's list
     * @param owner Address of the owner
     * @param tokenId ID of the token to remove
     */
    function _removeTokenFromOwnerList(address owner, uint256 tokenId) internal {
        uint256[] storage ownerTokens = _ownedTokens[owner];
        for (uint256 i = 0; i < ownerTokens.length; i++) {
            if (ownerTokens[i] == tokenId) {
                ownerTokens[i] = ownerTokens[ownerTokens.length - 1];
                ownerTokens.pop();
                break;
            }
        }
    }
}

