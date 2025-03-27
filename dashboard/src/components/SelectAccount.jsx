import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AccountSelector = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load saved account from localStorage
    const savedAccount = localStorage.getItem("selectedAccount");
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(
          "https://mt4api.frequencee.io/cgi-bin/MT4AccountList.py"
        );
        setAccounts(response.data);
        
        // Set account from storage or first available
        setSelectedAccount(
          savedAccount && response.data.includes(Number(savedAccount))
            ? Number(savedAccount)
            : response.data[0]
        );
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
    //localStorage.setItem("selectedAccount", account.toString());
    localStorage.setItem("selectedAccount", account);
    
    setIsOpen(false);
    if (window.location.pathname === "/") {
      // Force reload if already on home page
      window.location.reload();
    } else {
      // Navigate to home if on another page
      navigate("/");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Circular Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center bg-[#80ee64] hover:bg-[#6ed653] text-black font-inter font-semibold rounded-full h-14 w-14 shadow-lg transition-all duration-300"
      >
        {selectedAccount || "?"}
      </button>

      {/* Account Selection Panel */}
      {isOpen && (
        <div className="absolute bottom-full right-0 mb-4 p-2 bg-[#151818] border border-[#637260] rounded-lg shadow-lg flex gap-2">
          {accounts.map((account) => (
            <button
              key={account}
              onClick={() => handleAccountSelect(account)}
              className={`flex items-center justify-center h-10 w-10 rounded-full font-inter text-sm ${
                account === selectedAccount
                  ? "bg-[#80ee64] text-black"
                  : "bg-[#151818] text-[#ddffdc] border border-[#637260] hover:bg-[#637260]/50"
              }`}
            >
              {account}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountSelector;