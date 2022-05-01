import React, { useEffect, useState } from 'react'
import './CurrentLoan.css'
import { useNavigate } from 'react-router-dom';
import { Get_current_loans } from '../../API/UserService';
import md5 from 'md5';

function CurrentLoans(){
    const navigate = useNavigate();

    const[allLoanData, setLoanData] = useState([]);

    const get_current_loan = () => {
        Get_current_loans().then(({ data }) => {
            setLoanData(Array.from(data));
            console.log(data);
        }).catch(({ response }) => {
            console.log("Error getting current loans");
        })
    };

    useEffect(() => {
        get_current_loan();
    }, []);

    return(
        <section id='loan-section'>
            {
                allLoanData.map(dataItem => (
                    <div class="accordion" id={"i" + md5(dataItem.dateOut) + "parent"}>
                                          <div class="accordion-item">
                                                <h2 class="accordion-header" id={"i" + md5(dataItem.dateOut) + "-heading"}>
                                                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={'#' + "i" +  md5(dataItem.dateOut)} aria-expanded="true" aria-controls={"i" + md5(dataItem.dateOut)}>
                                                        <strong>{dataItem.dateOut}</strong>
                                                      </button>
                                                </h2>
                                                <div id={"i" + md5(dataItem.dateOut)} class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent={"i" + md5(dataItem.dateOut) + "parent"}>

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

    );

}

export default CurrentLoans