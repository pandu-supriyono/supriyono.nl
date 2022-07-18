module.exports = () => {
  const isProd = process.env.NODE_ENV === 'production'

  return {
    name: 'supriyono.nl',
    url: isProd ? 'https://supriyono.nl' : 'http://localhost:8080',
    description: 'I am Pandu Supriyono, an Utrecht-based web developer focusing on building inclusive and resillient web applications. ',
    author: 'Pandu Supriyono',
    email: 'mail@supriyono.nl',
    language: 'en',
    environment: process.env.NODE_ENV || 'development',
    lastUpdated: new Date(),
    contact: [{
      name: 'Email',
      href: 'mailto:mail@supriyono.nl'
    },
    {
      name: 'GitHub',
      href: 'https://github.com/pandu-supriyono'
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/pandu_yono'
    }]
  }
}
