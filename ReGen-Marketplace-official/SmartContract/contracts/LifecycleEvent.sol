// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./AccessControl.sol";

/**
 * @title LifecycleEvent
 * @dev Manages lifecycle events for products using Hedera Consensus Service (HCS) concepts
 * Logs verifiable lifecycle events like repair, inspection, recycling on the blockchain
 */
contract LifecycleEvent is AccessControl {
    // Event types enumeration
    enum EventType {
        CREATE,
        TRANSFER,
        REPAIR,
        INSPECTION,
        RECYCLE,
        VERIFY,
        REFURBISH,
        DISASSEMBLY
    }
    
    // Lifecycle event structure
    struct Event {
        uint256 eventId;
        uint256 tokenId;
        EventType eventType;
        string description;
        address actor; // Address of the person/entity who performed the action
        string proofHash; // Hash of proof document (image, certificate, etc.)
        uint256 timestamp;
        bool verified;
    }
    
    // Mapping from token ID to array of events
    mapping(uint256 => Event[]) public eventHistory;
    
    // Mapping from event ID to event details
    mapping(uint256 => Event) public events;
    
    // Counter for event IDs
    uint256 private _eventIdCounter;
    
    // Reference to ProductPassport contract
    address public productPassportAddress;
    
    // Events
    event LifecycleEventLogged(
        uint256 indexed eventId,
        uint256 indexed tokenId,
        EventType eventType,
        address indexed actor,
        uint256 timestamp
    );
    
    event EventVerified(
        uint256 indexed eventId,
        address indexed verifier,
        uint256 timestamp
    );
    
    // Modifiers
    modifier onlyAuthorizedRole() {
        require(
            hasRole(MANUFACTURER_ROLE, msg.sender) ||
            hasRole(VERIFIED_SERVICE_CENTER_ROLE, msg.sender) ||
            hasRole(RECYCLER_ROLE, msg.sender),
            "LifecycleEvent: Insufficient permissions"
        );
        _;
    }
    
    /**
     * @dev Constructor
     */
    constructor() {
        _eventIdCounter = 1;
    }
    
    /**
     * @dev Set the ProductPassport contract address
     * @param passportAddress Address of the ProductPassport contract
     */
    function setProductPassportAddress(address passportAddress) public onlyAdmin {
        require(passportAddress != address(0), "LifecycleEvent: Invalid address");
        productPassportAddress = passportAddress;
    }
    
    /**
     * @dev Log a lifecycle event for a product
     * @param tokenId The product token ID
     * @param eventType Type of event (CREATE, REPAIR, RECYCLE, etc.)
     * @param description Human-readable description of the event
     * @param actor Address of the person/organization performing the action
     * @param proofHash Hash of proof document for verification
     * @return eventId The ID of the logged event
     */
    function logEvent(
        uint256 tokenId,
        EventType eventType,
        string memory description,
        address actor,
        string memory proofHash
    ) public onlyAuthorizedRole returns (uint256) {
        require(bytes(description).length > 0, "LifecycleEvent: Description cannot be empty");
        require(actor != address(0), "LifecycleEvent: Actor address cannot be zero");
        require(bytes(proofHash).length > 0, "LifecycleEvent: Proof hash cannot be empty");
        
        uint256 eventId = _eventIdCounter;
        _eventIdCounter++;
        
        Event memory newEvent = Event({
            eventId: eventId,
            tokenId: tokenId,
            eventType: eventType,
            description: description,
            actor: actor,
            proofHash: proofHash,
            timestamp: block.timestamp,
            verified: false
        });
        
        events[eventId] = newEvent;
        eventHistory[tokenId].push(newEvent);
        
        emit LifecycleEventLogged(eventId, tokenId, eventType, actor, block.timestamp);
        
        return eventId;
    }
    
    /**
     * @dev Get all lifecycle events for a specific product
     * @param tokenId The product token ID
     * @return productEvents Array of all events for this product
     */
    function getEventHistory(uint256 tokenId) public view returns (Event[] memory productEvents) {
        productEvents = eventHistory[tokenId];
    }
    
    /**
     * @dev Get total number of events for a product
     * @param tokenId The product token ID
     * @return count Total number of events
     */
    function getEventCount(uint256 tokenId) public view returns (uint256 count) {
        count = eventHistory[tokenId].length;
    }
    
    /**
     * @dev Get details of a specific event
     * @param eventId The event ID
     * @return eventDetails The event details
     */
    function getEventDetails(uint256 eventId) public view returns (Event memory eventDetails) {
        require(events[eventId].eventId != 0, "LifecycleEvent: Event does not exist");
        eventDetails = events[eventId];
    }
    
    /**
     * @dev Verify an event (only admin or authorized verifiers)
     * @param eventId The event ID to verify
     */
    function verifyEvent(uint256 eventId) public {
        require(
            hasRole(ADMIN_ROLE, msg.sender) ||
            hasRole(VERIFIED_SERVICE_CENTER_ROLE, msg.sender),
            "LifecycleEvent: Only authorized verifiers can verify events"
        );
        require(events[eventId].eventId != 0, "LifecycleEvent: Event does not exist");
        require(!events[eventId].verified, "LifecycleEvent: Event already verified");
        
        events[eventId].verified = true;
        
        // Update the event in the history
        uint256 tokenId = events[eventId].tokenId;
        for (uint256 i = 0; i < eventHistory[tokenId].length; i++) {
            if (eventHistory[tokenId][i].eventId == eventId) {
                eventHistory[tokenId][i].verified = true;
                break;
            }
        }
        
        emit EventVerified(eventId, msg.sender, block.timestamp);
    }
    
    /**
     * @dev Get all repair events for a product
     * @param tokenId The product token ID
     * @return repairEvents Array of repair events
     */
    function getRepairEvents(uint256 tokenId) public view returns (Event[] memory repairEvents) {
        Event[] memory allEvents = eventHistory[tokenId];
        uint256 repairCount = 0;
        
        // Count repair events
        for (uint256 i = 0; i < allEvents.length; i++) {
            if (allEvents[i].eventType == EventType.REPAIR) {
                repairCount++;
            }
        }
        
        // Create array and populate it
        repairEvents = new Event[](repairCount);
        uint256 index = 0;
        for (uint256 i = 0; i < allEvents.length; i++) {
            if (allEvents[i].eventType == EventType.REPAIR) {
                repairEvents[index] = allEvents[i];
                index++;
            }
        }
    }
    
    /**
     * @dev Get all recycling events for a product
     * @param tokenId The product token ID
     * @return recycleEvents Array of recycling events
     */
    function getRecyclingEvents(uint256 tokenId) public view returns (Event[] memory recycleEvents) {
        Event[] memory allEvents = eventHistory[tokenId];
        uint256 recycleCount = 0;
        
        // Count recycling events
        for (uint256 i = 0; i < allEvents.length; i++) {
            if (allEvents[i].eventType == EventType.RECYCLE) {
                recycleCount++;
            }
        }
        
        // Create array and populate it
        recycleEvents = new Event[](recycleCount);
        uint256 index = 0;
        for (uint256 i = 0; i < allEvents.length; i++) {
            if (allEvents[i].eventType == EventType.RECYCLE) {
                recycleEvents[index] = allEvents[i];
                index++;
            }
        }
    }
}

