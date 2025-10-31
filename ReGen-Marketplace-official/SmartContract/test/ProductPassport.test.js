const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ProductPassport", function () {
  let productPassport;
  let accessControl;
  let owner, manufacturer1, user1, user2;

  beforeEach(async function () {
    [owner, manufacturer1, user1, user2] = await ethers.getSigners();

    // Deploy AccessControl
    const AccessControl = await ethers.getContractFactory("AccessControl");
    accessControl = await AccessControl.deploy();

    // Deploy ProductPassport
    const ProductPassport = await ethers.getContractFactory("ProductPassport");
    productPassport = await ProductPassport.deploy();

    // Grant manufacturer role
    await accessControl.grantRole(
      await accessControl.MANUFACTURER_ROLE(),
      manufacturer1.address
    );
  });

  describe("Minting", function () {
    it("Should mint a new product NFT", async function () {
      const metadataURI = "ipfs://QmTest123";
      const serialNumber = "SN123456";
      
      await expect(
        productPassport.connect(manufacturer1).mintProductNFT(
          metadataURI,
          manufacturer1.address,
          serialNumber
        )
      ).to.emit(productPassport, "ProductMinted")
        .withArgs(1, manufacturer1.address, serialNumber, await anyValue());
    });

    it("Should fail to mint if not a manufacturer", async function () {
      const metadataURI = "ipfs://QmTest123";
      const serialNumber = "SN123456";
      
      await expect(
        productPassport.connect(user1).mintProductNFT(
          metadataURI,
          manufacturer1.address,
          serialNumber
        )
      ).to.be.revertedWith("ProductPassport: Only manufacturer can mint products");
    });
  });

  describe("Ownership", function () {
    it("Should transfer ownership correctly", async function () {
      // Mint a product
      const metadataURI = "ipfs://QmTest123";
      const serialNumber = "SN123456";
      
      await productPassport.connect(manufacturer1).mintProductNFT(
        metadataURI,
        manufacturer1.address,
        serialNumber
      );

      const tokenId = 1;

      // Transfer ownership
      await expect(
        productPassport.connect(manufacturer1).transferOwnership(
          tokenId,
          user1.address,
          "RESALE"
        )
      ).to.emit(productPassport, "OwnershipTransferred");

      // Check new owner
      expect(await productPassport.ownerOf(tokenId)).to.equal(user1.address);
    });
  });

  describe("Product Info", function () {
    it("Should return correct product information", async function () {
      const metadataURI = "ipfs://QmTest123";
      const serialNumber = "SN123456";
      
      await productPassport.connect(manufacturer1).mintProductNFT(
        metadataURI,
        manufacturer1.address,
        serialNumber
      );

      const tokenId = 1;
      const [product, transfers, history] = await productPassport.getProductInfo(tokenId);

      expect(product.metadataURI).to.equal(metadataURI);
      expect(product.serialNumber).to.equal(serialNumber);
      expect(product.manufacturer).to.equal(manufacturer1.address);
      expect(product.currentOwner).to.equal(manufacturer1.address);
    });
  });
});

