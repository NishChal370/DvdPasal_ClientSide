import React, { useEffect, useState } from 'react'
import './CurrentLoan.css'
import md5 from 'md5';
import { Get_current_loans } from '../../../API/UserService';

function CurrentLoans(){

    const[allLoanData, setLoanData] = useState([]);

    const get_current_loan = () => {
        Get_current_loans().then(({ data }) => {
            
            setLoanData(Array.from(data));
            console.log(data);
        }).catch(({ response }) => {
            
            console.log("Error getting current loans");
        })
    };


    const dateConverter=(dateStr)=>{
        const  monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let date = new Date(dateStr);
        const year = date.getFullYear()
        const month = monthsList[date.getMonth()];
        const day = (date.getDate()<10) ?0+""+date.getDate() :date.getDate();

        return month+" "+day+" "+year
  }

    useEffect(() => {
        get_current_loan();
    }, []);

    return(
        <div id='currentLoans' style={{marginTop:'2rem'}}>
            <section id='register-staff-wrrapper'>
                <nav>
                        <p className='fw-bolder fs-1 moving-text---effect'>Current Loans</p>
                </nav>
                <hr />

                
                <section id='loan-section'>
                    {
                        allLoanData.map(dataItem => (
                            <div class="accordion" id={"i" + md5(dataItem.dateOut) + "parent"}>
                                                <div class="accordion-item">
                                                        <h2 class="accordion-header" id={"i" + md5(dataItem.dateOut) + "-heading"}>
                                                            <button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target={'#' + "i" +  md5(dataItem.dateOut)} aria-expanded="true" aria-controls={"i" + md5(dataItem.dateOut)}>
                                                                <strong style={{marginLeft:'44%'}}>Loaned on {dateConverter(dataItem.dateOut)}</strong>
                                                            </button>
                                                        </h2>
                                                        <div id={"i" + md5(dataItem.dateOut)} class="accordion-collapse   collapse show" aria-labelledby="headingOne" data-bs-parent={"i" + md5(dataItem.dateOut) + "parent"}>

                                                            <div class="accordion-body">
                                                                    <table class="table">
                                                                        <thead>
                                                                            <th>Loan Id</th>
                                                                            <th>Copy Id</th>
                                                                            <th>DvD Title</th>
                                                                            <th>Loaned By</th>
                                                                            <th>Date Out</th>
                                                                            <th>Date Due</th>
                                                                            <th>Total Loans(Copy)</th>
                                                                        </thead>
                                                                        <tbody>
                                                                            {dataItem.loanData.map(loan => (
                                                                                <tr>
                                                                                    <td>{loan.loanId}</td>
                                                                                    <td>{loan.copyId}</td>
                                                                                    <td>{loan.dvdTitle}</td>
                                                                                    <td>{loan.memberName}</td>
                                                                                    <td>{loan.dateOut}</td>
                                                                                    <td>{loan.dateDue}</td>
                                                                                    <td>{loan.totalLoans}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                            </div>
                                                        </div>
                                                </div>

                                            </div>
                        ))
                    }
                </section>
            </section>
        </div>
    );

}

export default CurrentLoans