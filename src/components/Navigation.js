import { useRef, useEffect } from 'react';
import { ethers } from 'ethers';


const Navigation = ({ account, setAccount }) => {
    const isConnectingRef = useRef(false);

    const connectHandler = async () => {
        if (!window.ethereum) {
            alert("MetaMask not found");
            return;
        }

        if (isConnectingRef.current) return;

        isConnectingRef.current = true;

        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = ethers.utils.getAddress(accounts[0]);
            setAccount(account);
        } catch (error) {
            console.error("Connection error:", error.message || error);
        } finally {
            isConnectingRef.current = false;
        }
    };

    // 🔄 Auto-detect connected wallet on page load
    useEffect(() => {
        const checkIfWalletIsConnected = async () => {
            if (!window.ethereum) return;

            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    const account = ethers.utils.getAddress(accounts[0]);
                    setAccount(account);
                    console.log("Auto-connected to:", account);
                }
            } catch (err) {
                console.error("Failed to check accounts:", err.message);
            }
        };

        checkIfWalletIsConnected();
    }, [setAccount]);

    return (
        <nav>
            <div className='nav__brand'>
                <h1>Nolanzy</h1>
            </div>

            <input
                type="text"
                className="nav__search"
            />

            {account ? (
                <button
                    type="button"
                    className='nav__connect'
                >
                    {account.slice(0, 6) + '...' + account.slice(38, 42)}
                </button>
            ) : (
                <button
                    type="button"
                    className='nav__connect'
                    onClick={connectHandler}
                >
                    Connect
                </button>
            )}

            <ul className='nav__links'>
                <li><a href="#Clothing & Jewelry">Clothing & Jewelry</a></li>
                <li><a href="#Electronics & Gadgets">Electronics & Gadgets</a></li>
                <li><a href="#Toys & Gaming">Toys & Gaming</a></li>
            </ul>
        </nav>
    );
};

export default Navigation;
