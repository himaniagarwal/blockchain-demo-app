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
		});
	},

	donate: function(donorId, receiverId, amount) {
		var donorId = $("#donorId").val();
		var receiverId = $("#receiverId").val();
		var amount = $("#amount").val();
		var donateInstance;

		App.contracts.Donate.deployed().then(function(instance) {
			donateInstance = instance;
			return donateInstance.donateAmount(parseInt(donorId), parseInt(receiverId), parseInt(amount));
		}).then(function(result) {
			{
				donateInstance.getDonorBalance(donorId).then(function (result){
					$("#balance_d"+donorId).text(result.c[0]);
				});
			}
			$("#balance_d"+receiverId).text(donateInstance.getAcceptorBalance(receiverId)).call();
		}).catch(function(err) {
			console.log(err.message);
		});

	},



}
$(function() {
	$(document).ready(function() {
		App.init();
	});
});