export interface LoanDto {
    id: number
    bookId: number
    bookTitle: string
    bookCoverUrl: string
    loanDate: string
    daysOverdue: number
}
