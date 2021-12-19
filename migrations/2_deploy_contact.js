const Posts = artifacts.require("./Posts.sol");

module.exports = function(deployer) {
  deployer.deploy(Posts);
};