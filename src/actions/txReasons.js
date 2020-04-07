export const SAVE_TX_REASONS = 'SAVE_TX_REASONS'

export function saveTxReasons(txReasons) {
    return {
        type: SAVE_TX_REASONS,
        txReasons
    }
}
