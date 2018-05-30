var Donate = artifacts.require("Donate");

contract('Donate', function(accounts) {
  it("should return donor balance for an id", function() {
    return Donate.deployed().then(function(instance) {
      return instance.getDonorBalance(1);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 1000, "abcd");
    });
  });

    it("should return acceptor balance for an id", function() {
    return Donate.deployed().then(function(instance) {
      return instance.getAcceptorBalance(1);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 0, "abcd");
    });
  });
  });