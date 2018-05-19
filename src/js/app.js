App = {
	web3Provider: null,
	contracts: {},

	init: function() {
		console.log("init called");
		return App.initWeb3();
	},

	initWeb3: function() {
		if (typeof web3 !== 'undefined') {
			App.web3Provider = web3.currentProvider;
		} 
		else {
			App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
		}
		web3 = new Web3(App.web3Provider);
		return App.initContract();
	},

	initContract: function() {
		$.getJSON('Donate.json', function(data) {
			var DonateArtifact = data;
			App.contracts.Donate = TruffleContract(DonateArtifact);

			App.contracts.Donate.setProvider(App.web3Provider);
			App.getBalance();
			App.donate(1,1,1);
		});
	}
}
$(function() {
	$(document).ready(function() {
		App.init();
	});
});