'use strict';

var steve;
var stevesLoan;
var month = 0;
var monthsUntilEvicted;

function loan() {
  var account = {};
  account.borrowed = 550000;
  account.balance = 286000;
  account.monthlyPayment = 1700;
  account.defaulted = 0;
  account.defaultsToForeclose = 5;
  account.foreclose = false;

  function missPayment() {
    account.defaulted += 1;
    if (account.defaulted >= account.defaultsToForeclose) {
      account.foreclosed = true;

      return {

        getBalance : function() {
          return account.balance;
        },

        receivePayment : function(amount) {
          if (amount < account.monthlyPayment) {
            missPayment();
          }
          account.balance -= amount;
        },

        getMonthlyPayment : function () {
          return account.monthlyPayment;
        },

        isForeclosed : function() {
          return account.foreclosed;
        }
      };
    }
  }
}

function borrower(loan) {
  var account = {};
  account.monthlyIncome = 1350;
  account.funds = 2800;
  account.loan = loan;

  return {
    getFunds : function() {
      if (account.funds > account.monthlyPayment) {
        return account.funds;
      }
    },

    makePayment : function() {
      if (account.funds > account.monthlyPayment) {
        account.funds -= account.monthlyPayment;
        loan.payments.receivePayment(account.funds);
        account.funds = 0;
      }
    },

    payDay : function() {
      account.funds += account.monthlyIncome;
    }
  };
}

stevesLoan = loan();
steve = borrower(stevesLoan);
while (steve.isForeclosed !== true) {
  steve.payDay();
  steve.makePayment();
  month++;
}