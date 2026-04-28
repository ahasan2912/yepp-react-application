const HeadingTitle = ({ title, description }) => {
    return (
        <div data-animate="fade-up">
            <h1 className='text-primary text-2xl font-bold'>{title}</h1>
            <p className='text-base font-medium text-[#737373] mt-1'>{description}</p>
        </div>
    );
};

export default HeadingTitle;
