export interface UserAccount {
    id: number,
    firstName: string,
    lastName: string,
    eMail: string,
    balance: number,
    numberTransactions: number,
    userRole: string,
    deposit: Deposit[]

}
export interface Deposit {
    id: number,
    date: Date,
    depositValue: number,
    description: string,
    authorized: boolean
}