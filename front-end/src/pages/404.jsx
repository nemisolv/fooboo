import Button from '@/components/Button'
import bgImage from '@/assets/images/404.gif'; // Import the image

function PageNotFound() {
  return (
    <div id="page-not-found" className="relative bg-no-repeat bg-center !bg-white" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="text-center absolute bottom-[200px] flex flex-col gap-5 ">
        <h2 className="font-medium">Opps! Page not found </h2>
        <p>Something went wrong. Page not found</p>
        <Button to="/" primary>Go to home</Button>
      </div>
    </div>
  )
}

export default PageNotFound;