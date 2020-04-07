export const SAVE_RANKINGS = 'SAVE_RANKINGS'

export function saveRankings(rankings) {
    return {
        type: SAVE_RANKINGS,
        rankings
    }
}
