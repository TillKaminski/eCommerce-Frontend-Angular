export interface UserAccount {
    id: number,
    firstName: string,
    lastName: string,
    eMail: string,
    balance: number,
    userRole: string,
    deposit: Deposit[]

}
export interface Deposit {
    id: number,
    date: Date,
    depositValue: number,
    authorized: boolean
}