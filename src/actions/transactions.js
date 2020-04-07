export const SAVE_TXS = 'SAVE_TXS'
export const SAVE_NEW_TX = 'SAVE_NEW_TX'

export function saveTxs(txs) {
    return {
        type: SAVE_TXS,
        txs
    }
}

export function saveNewTx(tx) {
    return {
        type: SAVE_NEW_TX,
        tx
    }
}