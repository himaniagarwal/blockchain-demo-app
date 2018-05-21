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
		return $.getJSON('Donate.json', function(data) {
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
				App.getDonorBalance(donateInstance,donorId);
				App.getAcceptorBalance(donateInstance,receiverId);
			}
		}).catch(function(err) {
			console.log(err.message);
		});

	},


	getDonorBalance: function(donateInstance, donorId) {
		donateInstance.getDonorBalance(donorId).then(function (result){
			$("#balance_d"+donorId).text(result.c[0]);
		});
	},

	getAcceptorBalance: function(donateInstance, acceptorId) {
		donateInstance.getAcceptorBalance(acceptorId).then(function (result){
			$("#balance_a"+acceptorId).text(result.c[0]);
		});
	},

	showBalances: function() {
		App.contracts.Donate.deployed().then(function(instance) {
			donateInstance = instance;
			for(var i=1;i<3;i++) {
				App.getDonorBalance(donateInstance, i);
			}
			for(var i=1;i<4;i++) {
				App.getAcceptorBalance(donateInstance, i);
			}
		})
	},
}
$(function() {
	$(document).ready(function() {
		App.init().then(function(empty){
			App.showBalances();
		});
	});
});