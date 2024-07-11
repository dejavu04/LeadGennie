
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { TypewriterEffect } from "../components/typewriter-effect";
import { HoverEffect } from "../components/card-hover-effect";
import React from "react";
import { WobbleCard } from "../components/wobble-card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  // Words for the typewriter effect
  const words = [
    { text: "Build" },
    { text: "awesome" },
    { text: "business" },
    { text: "with" },
    { text: "Lead Geniee.", className: "text-indigo-500 dark:text-indigo-500" },
  ];

  // Projects for the hover card
  const projects = [
    {
      title: "Stripe",
      description: "A technology company that builds economic infrastructure for the internet.",
    },
    {
      title: "Netflix",
      description: "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    },
    {
      title: "Google",
      description: "A multinational technology company that specializes in Internet-related services and products.",
    },
    {
      title: "Meta",
      description: "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    },
    {
      title: "Amazon",
      description: "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    },
    {
      title: "Microsoft",
      description: "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    },
  ];

  // Infinite scrolling card data
  const data = [
    {
      name: "John Morgan",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      name: "Ellie Anderson",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      name: "Nia Adebayo",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      name: "Rigo Louie",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      name: "Mia Williams",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
  ];

  // Typewriter effect component
  function TypewriterEffectDemo() {
    return (
      <div className="flex flex-col items-center justify-center h-[20rem] my-16">
        <p className="text-neutral-600 dark:text-neutral-200 text-base mb-10">
        Gateway to global growth
        </p>
        <TypewriterEffect words={words} />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
          <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
            Book call
          </button>
          <Link to='/sign-up'>
          <button className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm">
            Sign-Up
          </button>
          </Link>
        </div>
      </div>
    );
  }

  // Hover effect component
  function CardHoverEffectDemo() {
    return (
      <div className="max-w-5xl mx-auto px-8 my-16">
        <HoverEffect items={projects} gradientDuoTone="indigoToblue" className="rounded-tl-xl rounded-bl-none" />
      </div>
    );
  }

  // Wobble card component
  function WobbleCardDemo() {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full my-16">
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
          className=""
        >
          <div className="max-w-xs">
            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Gippity AI powers the entire universe
            </h2>
            <p className="mt-4 text-left text-[0.9375rem] text-neutral-200">
              With over 100,000 monthly active bot users, Gippity AI is the most
              popular AI platform for developers.
            </p>
          </div>
        </WobbleCard>
        <WobbleCard containerClassName="col-span-1 min-h-[300px]">
          <h2 className="max-w-[20rem] text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            No shirt, no shoes, no weapons.
          </h2>
          <p className="mt-4 max-w-[16rem] text-left text-[0.9375rem] text-neutral-200">
            If someone yells “stop!”, goes limp, or taps out, the fight is over.
          </p>
        </WobbleCard>
        <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
          <div className="max-w-sm">
            <h2 className="max-w-[20rem] md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Signup for blazing-fast cutting-edge state of the art Gippity AI
              wrapper today!
            </h2>
            <p className="mt-4 max-w-[16rem] text-left text-[0.9375rem] text-neutral-200">
              With over 100,000 monthly active bot users, Gippity AI is the most
              popular AI platform for developers.
            </p>
          </div>
        </WobbleCard>
      </div>
    );
  }

  // Carousel component
  function Carousel() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    };
    return (
      <div className='w-3/4 m-auto my-16'>
        <div className="mt-20">
          <Slider {...settings}>
            {data.map((d) => (
              <div key={d.name} className="bg-white h-[450px] text-black rounded-xl">
                <div className='h-56 bg-indigo-500 flex justify-center items-center rounded-t-xl'>
                  <img src={d.img} alt="" className="h-44 w-44 rounded-full"/>
                </div>

                <div className="flex flex-col items-center justify-center gap-4 p-4">
                  <p className="text-xl font-semibold">{d.name}</p>
                  <p className="text-center">{d.review}</p>
                  <button className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl'>Read More</button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='flex flex-col gap-3 p-7 px-3 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold lg:text-6xl'>Ready-to-meet prospects<br/> delivered to your calendar</h1>
        <p className='text-gray-500 text-base sm:text-lg'>
  We help technology-focused companies accelerate their sales by connecting them with high-quality leads.
</p>


        <Link
          to='/search'
          className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
        >
          View all posts
        </Link>
      </div>
      <div>
        <TypewriterEffectDemo />
      </div>
      
      <div className='p-3 dark:bg-slate-700 my-16'>
        <CallToAction />
      </div>

      <div className='mt-8'>
        <h2 className='text-5xl font-semibold text-center'>
          How we work
        </h2>
        <WobbleCardDemo />
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-4xl font-semibold text-center'>
              Discover some of our recent articles
            </h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to='/search'
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
      
      <div>
       <h2 className='text-5xl font-semibold text-center'>
          Testimonials
        </h2>
        <Carousel />
      </div>
    
    </div>
  );
}
