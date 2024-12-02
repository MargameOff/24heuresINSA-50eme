import { NextResponse } from 'next/server'

const verifyRecaptcha = async (token: string) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${secretKey}&response=${token}`,
  })

  const data = await response.json()
  return data.success
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, category, subject, message, captcha } = body

    if (!captcha) {
      return NextResponse.json(
        { error: 'Veuillez valider le captcha' },
        { status: 400 }
      )
    }

    const isValidCaptcha = await verifyRecaptcha(captcha)
    if (!isValidCaptcha) {
      return NextResponse.json(
        { error: 'Validation du captcha échouée' },
        { status: 400 }
      )
    }

    // TODO: Implement email sending logic here
    // You can use services like SendGrid, AWS SES, or Nodemailer
    
    // For now, we'll just log the data
    console.log('Email data:', { name, email, category, subject, message })

    return NextResponse.json(
      { message: 'Message envoyé avec succès' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in contact API:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    )
  }
} 