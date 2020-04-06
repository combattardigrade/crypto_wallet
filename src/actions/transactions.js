export const SAVE_TXS = 'SAVE_TXS'

export function saveTxs(txs) {
    return {
        type: SAVE_TXS,
        txs
    }
}
