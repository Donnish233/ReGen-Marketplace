// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./AccessControl.sol";

/**
 * @title GreenPoints
 * @dev Manages GreenPoints reward tokens (HTS compatible) for sustainable actions
 * Users earn GreenPoints for recycling, verified resale, and other eco-friendly actions
 */
contract GreenPoints is AccessControl {
    // Reward reasons enumeration
    enum RewardReason {
        RECYCLING,
        VERIFIED_RESALE,
        REPAIR,
        REFURBISHMENT,
        SUSTAINABILITY_BADGE,
        ECO_AUDIT,
        CARBON_OFFSET,
        CIRCULAR_EARNING
    }
    
    // Points issuance record
    struct IssuanceRecord {
        uint256 recordId;
        address user;
        uint256 amount;
        RewardReason reason;
        string description;
        uint256 timestamp;
    }
    
    // Redemption record
    struct RedemptionRecord {
        uint256 recordId;
        address user;
        uint256 amount;
        string redemptionType; // e.g., "MARKETPLACE_DISCOUNT", "CARBON_CREDIT"
        uint256 timestamp;
    }
    
    // Balances mapping
    mapping(address => uint256) private _balances;
    
    // Total supply
    uint256 private _totalSupply;
    
    // Issuance records
    mapping(uint256 => IssuanceRecord) public issuanceRecords;
    uint256 private _issuanceCounter;
    
    // Redemption records
    mapping(uint256 => RedemptionRecord) public redemptionRecords;
    uint256 private _redemptionCounter;
    
    // Mapping from user to their issuance records
    mapping(address => uint256[]) private _userIssuances;
    
    // Mapping from user to their redemption records
    mapping(address => uint256[]) private _userRedemptions;
    
    // Events
    event PointsIssued(
        uint256 indexed recordId,
        address indexed user,
        uint256 amount,
        RewardReason reason,
        uint256 timestamp
    );
    
    event PointsRedeemed(
        uint256 indexed recordId,
        address indexed user,
        uint256 amount,
        string redemptionType,
        uint256 timestamp
    );
    
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 amount
    );
    
    // Modifiers
    modifier onlyIssuer() {
        require(
            hasRole(ADMIN_ROLE, msg.sender) ||
            hasRole(MANUFACTURER_ROLE, msg.sender) ||
            hasRole(VERIFIED_SERVICE_CENTER_ROLE, msg.sender) ||
            hasRole(RECYCLER_ROLE, msg.sender),
            "GreenPoints: Only authorized issuers can issue points"
        );
        _;
    }
    
    /**
     * @dev Constructor
     */
    constructor() {
        _totalSupply = 0;
        _issuanceCounter = 1;
        _redemptionCounter = 1;
    }
    
    /**
     * @dev Issue GreenPoints to a user for a sustainable action
     * @param userAddress Address of the user to receive points
     * @param amount Amount of points to issue
     * @param reason Reason for issuing points
     * @param description Additional description
     * @return recordId The ID of the issuance record
     */
    function issuePoints(
        address userAddress,
        uint256 amount,
        RewardReason reason,
        string memory description
    ) public onlyIssuer returns (uint256) {
        require(userAddress != address(0), "GreenPoints: Cannot issue to zero address");
        require(amount > 0, "GreenPoints: Amount must be greater than zero");
        
        uint256 recordId = _issuanceCounter;
        _issuanceCounter++;
        
        _balances[userAddress] += amount;
        _totalSupply += amount;
        
        issuanceRecords[recordId] = IssuanceRecord({
            recordId: recordId,
            user: userAddress,
            amount: amount,
            reason: reason,
            description: description,
            timestamp: block.timestamp
        });
        
        _userIssuances[userAddress].push(recordId);
        
        emit PointsIssued(recordId, userAddress, amount, reason, block.timestamp);
        
        return recordId;
    }
    
    /**
     * @dev Redeem GreenPoints for benefits or carbon offsets
     * @param amount Amount of points to redeem
     * @param redemptionType Type of redemption (e.g., "MARKETPLACE_DISCOUNT", "CARBON_CREDIT")
     */
    function redeemPoints(uint256 amount, string memory redemptionType) public {
        require(amount > 0, "GreenPoints: Amount must be greater than zero");
        require(_balances[msg.sender] >= amount, "GreenPoints: Insufficient balance");
        require(bytes(redemptionType).length > 0, "GreenPoints: Redemption type cannot be empty");
        
        uint256 recordId = _redemptionCounter;
        _redemptionCounter++;
        
        _balances[msg.sender] -= amount;
        _totalSupply -= amount;
        
        redemptionRecords[recordId] = RedemptionRecord({
            recordId: recordId,
            user: msg.sender,
            amount: amount,
            redemptionType: redemptionType,
            timestamp: block.timestamp
        });
        
        _userRedemptions[msg.sender].push(recordId);
        
        emit PointsRedeemed(recordId, msg.sender, amount, redemptionType, block.timestamp);
    }
    
    /**
     * @dev Get the balance of GreenPoints for a user
     * @param userAddress Address of the user
     * @return balance Current balance
     */
    function getBalance(address userAddress) public view returns (uint256 balance) {
        return _balances[userAddress];
    }
    
    /**
     * @dev Get total supply of GreenPoints
     * @return supply Total supply
     */
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }
    
    /**
     * @dev Get all issuance records for a user
     * @param userAddress Address of the user
     * @return records Array of issuance record IDs
     */
    function getUserIssuances(address userAddress) public view returns (uint256[] memory records) {
        records = _userIssuances[userAddress];
    }
    
    /**
     * @dev Get all redemption records for a user
     * @param userAddress Address of the user
     * @return records Array of redemption record IDs
     */
    function getUserRedemptions(address userAddress) public view returns (uint256[] memory records) {
        records = _userRedemptions[userAddress];
    }
    
    /**
     * @dev Get details of an issuance record
     * @param recordId The issuance record ID
     * @return record The issuance record details
     */
    function getIssuanceDetails(uint256 recordId) public view returns (IssuanceRecord memory record) {
        require(issuanceRecords[recordId].recordId != 0, "GreenPoints: Record does not exist");
        record = issuanceRecords[recordId];
    }
    
    /**
     * @dev Get details of a redemption record
     * @param recordId The redemption record ID
     * @return record The redemption record details
     */
    function getRedemptionDetails(uint256 recordId) public view returns (RedemptionRecord memory record) {
        require(redemptionRecords[recordId].recordId != 0, "GreenPoints: Record does not exist");
        record = redemptionRecords[recordId];
    }
    
    /**
     * @dev Transfer points between users (optional functionality)
     * @param to Address to transfer to
     * @param amount Amount to transfer
     */
    function transfer(address to, uint256 amount) public {
        require(to != address(0), "GreenPoints: Cannot transfer to zero address");
        require(_balances[msg.sender] >= amount, "GreenPoints: Insufficient balance");
        
        _balances[msg.sender] -= amount;
        _balances[to] += amount;
        
        emit Transfer(msg.sender, to, amount);
    }
    
    /**
     * @dev Burn points (remove from circulation permanently)
     * @param amount Amount to burn
     */
    function burn(uint256 amount) public onlyAdmin {
        require(_totalSupply >= amount, "GreenPoints: Cannot burn more than total supply");
        _totalSupply -= amount;
        emit Transfer(address(0), address(0), amount);
    }
}

