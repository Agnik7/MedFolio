import React from 'react'
import BookingModal from './BookingModal'
export default function DiseaseDoctorList({user, setUser, doctor, index, currentPage,itemsPerPage}) {
  return (
    <tr key={index}>
                    <td className='border-b p-2 text-center'>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className='border-b p-2'>{doctor.name}</td>
                    <td className='border-b p-2'>{doctor.specialization}</td>
                    <td className='border-b p-2'>{doctor.city}</td>
                    <td className='border-b p-2 text-center'>{doctor.experience}</td>
                    <td className='border-b p-2 text-center'>{doctor.rating}</td>
                    <td className='border-b p-2 text-center'>
                      <BookingModal userName={user.fullName} userEmail={user.email} doctorEmail={doctor.email} fees={doctor.fees} doctorName={doctor.name}/>
                    </td>
                  </tr>
  )
}
