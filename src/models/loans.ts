export interface ILoans {
    loanId: any;
    loanAmount: number | string;
    loanTerms: number | string;
    loanPaid: number | string;
    loanRemain: number | string;
    listOfRepayment?: any[];
}