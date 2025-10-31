// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title AccessControl
 * @dev Provides role-based access control for the ReGen Marketplace contracts
 */
contract AccessControl {
    // Roles
    bytes32 public constant MANUFACTURER_ROLE = keccak256("MANUFACTURER_ROLE");
    bytes32 public constant VERIFIED_SERVICE_CENTER_ROLE = keccak256("VERIFIED_SERVICE_CENTER_ROLE");
    bytes32 public constant RECYCLER_ROLE = keccak256("RECYCLER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    
    // Mapping from role to address to boolean
    mapping(bytes32 => mapping(address => bool)) private _roles;
    
    // Owner of the contract
    address public owner;
    
    event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender);
    event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    constructor() {
        owner = msg.sender;
        _roles[ADMIN_ROLE][msg.sender] = true;
    }
    
    modifier onlyAdmin() {
        require(hasRole(ADMIN_ROLE, msg.sender), "AccessControl: Only admin can call this function");
        _;
    }
    
    modifier onlyRole(bytes32 role) {
        require(hasRole(role, msg.sender), "AccessControl: Insufficient permissions");
        _;
    }

    function hasRole(bytes32 role, address account) public view returns (bool) {
        return _roles[role][account];
    }
    
    function grantRole(bytes32 role, address account) public onlyAdmin {
        require(!hasRole(role, account), "AccessControl: Account already has this role");
        _roles[role][account] = true;
        emit RoleGranted(role, account, msg.sender);
    }
    
    function revokeRole(bytes32 role, address account) public onlyAdmin {
        require(hasRole(role, account), "AccessControl: Account does not have this role");
        _roles[role][account] = false;
        emit RoleRevoked(role, account, msg.sender);
    }
    
    function transferOwnership(address newOwner) public onlyAdmin {
        require(newOwner != address(0), "AccessControl: New owner cannot be zero address");
        address oldOwner = owner;
        owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

