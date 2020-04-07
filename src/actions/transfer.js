export const SAVE_TRANSFER = 'SAVE_TRANSFER'

export function saveTransfer(transfer) {
    return {
        type: SAVE_TRANSFER,
        transfer
    }
}
