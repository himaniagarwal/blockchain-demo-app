pragma solidity ^0.4.17;

contract Donate {
  struct Donor {
  uint id;
  string donorName;
  uint balance;
 }

 struct Acceptor {
  uint id;
  string acceptorName;
  uint balance;
 }
 
  Donor[] donors;
 Acceptor[] acceptors;
 
constructor() public{
  
  donors.push(Donor(1,"Iron Man",1000));
  donors.push(Donor(2,"Thor",1000));


  acceptors.push(Acceptor(1,"Superman",0));
  acceptors.push(Acceptor(2,"Batman",0));
  acceptors.push(Acceptor(3,"Flash",0));
 }

 function donateAmount(uint donor_id , uint acceptor_id , uint amount) public{
  Donor memory current_donor;
  Acceptor memory target_acceptor;
  for(uint donor = 0 ; donor < donors.length ; donor++){
    if(donors[donor].id == donor_id){
      donors[donor].balance = donors[donor].balance - amount;
      break;
    }
  }

  for(uint acceptor = 0 ; acceptor < acceptors.length ; acceptor++){
    if(acceptors[acceptor].id == acceptor_id){
      acceptors[acceptor].balance = acceptors[acceptor].balance + amount;
      break;
    }
  }

  if(current_donor.balance >= amount){
    current_donor.balance = current_donor.balance - amount;
    target_acceptor.balance = target_acceptor.balance + amount;
  }
 }

 function getDonorBalance(uint donor_id) view returns (uint){
  Donor memory current_donor;
  for(uint donor = 0 ; donor < donors.length ; donor++){
    if(donors[donor].id == donor_id){
      current_donor = donors[donor];
      break;
    }
  }
  return current_donor.balance;
 }

 function getAcceptorBalance(uint acceptor_id) view returns (uint){
  Acceptor memory target_acceptor;
  for(uint acceptor = 0 ; acceptor < acceptors.length ; acceptor++){
    if(acceptors[acceptor].id == acceptor_id){
      target_acceptor = acceptors[acceptor];
      break;
    }
  }
  return target_acceptor.balance;
 }
}

  
