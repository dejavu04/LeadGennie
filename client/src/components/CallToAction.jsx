import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                Want to know about what we do .
            </h2>
            <p className='text-gray-500 my-2'>
                Checkout some of our works 
            </p>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                <a href="https://www.100jsprojects.com" target='_blank' rel='noopener noreferrer'>
                     Testimonials
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://www.newbreedmarketing.com/hubfs/Q3%20Blog%20Images%20%284%29-4.png" />
        </div>
    </div>
  )
}