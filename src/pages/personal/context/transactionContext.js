import React, {createContext, useContext, useState} from 'react';

const TransactionContext = createContext();
export const useTransaction = () => useContext(TransactionContext);


const TransactionContextProvider = ({children}) => {
    const [resetForm, setResetForm] = useState(false);

    return (
        <TransactionContext.Provider value={
            {
                resetForm,
                setResetForm
            }
        }>
            {children}
        </TransactionContext.Provider>
    );
};

export default TransactionContextProvider;