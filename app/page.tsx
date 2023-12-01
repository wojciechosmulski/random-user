'use client'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export default function Home() {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    fetch('https://randomuser.me/api')
      .then((response) => response.json())
      .then((data) => setUserData(data.results[0]))
      .catch((error) => console.log(error))
  }, [])

  if (!userData) {
    return <div>Loading...</div>
  }

  const { gender, name, location, email } = userData as {
    gender: string
    name: {
      title: string
      first: string
      last: string
    }
    location: {
      street: {
        number: string
        name: string
      }
      city: string
      state: string
      country: string
      postcode: string
    }
    email: string
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="shadow-md p-8 rounded bg-white">
        <h1 className="text-4xl font-bold mb-4">
          User Information
        </h1>
        <p className="text-lg mb-2">Gender: {gender}</p>
        <p className="text-lg mb-2">
          Name: {name.title} {name.first} {name.last}
        </p>
        <p className="text-lg mb-2">
          Location: {location.street.number}{' '}
          {location.street.name}, {location.city},{' '}
          {location.state}, {location.country},{' '}
          {location.postcode}
        </p>
        <p className="text-lg mb-2">Email: {email}</p>
      </div>
      <div className="mt-4">
        <Button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => {
            fetch('https://randomuser.me/api')
              .then((response) => response.json())
              .then((data) => setUserData(data.results[0]))
              .catch((error) => console.log(error))
          }}
        >
          Fetch User
        </Button>
      </div>
    </div>
  )
}
