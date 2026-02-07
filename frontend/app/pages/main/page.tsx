"use client";

export default function MainPage({ switchView }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-[42px] text-center">Add your Todo</h1>
      <div className="flex flex-col gap-12">
        <section className="flex flex-col gap-2">
          <article className="bg-black flex justify-between p-2 gap-2">
            <input className="bg-black text-white w-full"></input>
            <button className="bg-white text-black p-2 px-4">Add</button>
          </article>
          <section className="flex">
            <section>
              <svg
                viewBox="0 0 24 24"
                width="36"
                height="36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.78584 3C4.24726 3 3 4.24726 3 5.78584C3 6.59295 3.28872 7.37343 3.81398 7.98623L6.64813 11.2927C7.73559 12.5614 8.33333 14.1773 8.33333 15.8483V18C8.33333 19.6569 9.67648 21 11.3333 21H12.6667C14.3235 21 15.6667 19.6569 15.6667 18V15.8483C15.6667 14.1773 16.2644 12.5614 17.3519 11.2927L20.186 7.98624C20.7113 7.37343 21 6.59294 21 5.78584C21 4.24726 19.7527 3 18.2142 3H5.78584Z"
                    fill="#000000"
                  ></path>{" "}
                </g>
              </svg>
            </section>
            <input
              className="bg-black text-white w-full p-2"
              placeholder="Search..."
            ></input>
          </section>
          <section>
            <ul className="flex gap-4">
              <li className="bg-black text-white px-2 py-1 text-[0.8rem] flex items-center gap-2">
                Filter1
                <span>x</span>
              </li>
              <li className="bg-black text-white px-2 py-1 text-[0.8rem] flex items-center gap-2">
                Filter2
                <span>x</span>
              </li>
            </ul>
          </section>
        </section>

        <section>
          <ul className="flex gap-4 flex-col">
            <li className="flex gap-2 items-center justify-between">
              <article className="bg-black text-white flex justify-between p-2 items-center w-full">
                Great Thing to-do
                <span className="flex gap-4 items-center">
                  <section className="flex gap-2 text-[0.6rem]">
                    <p>Tag1</p>
                    <p>Tag2</p>
                  </section>
                  <section className="">···</section>
                </span>
              </article>
              <p> ✓</p>
            </li>
            <li className="flex gap-2 items-center justify-between">
              <article className="bg-black text-white flex justify-between p-2 items-center w-full">
                Great Thing to-do
                <span className="flex gap-4 items-center">
                  <section className="flex gap-2 text-[0.6rem]">
                    <p>Tag1</p>
                    <p>Tag2</p>
                  </section>
                  <section className="">···</section>
                </span>
              </article>
              <p> ✓</p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
