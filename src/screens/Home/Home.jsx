import './Home.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Slides from './Slides'

function Home() {

    return (
        <div className='content'>
            <div className='header'>
                <Header />
            </div>
            <div className='section'>
                <Slides />

                <div className='inner_content'>
                    <h1>Introduction</h1>

                    <p> "AlumniSpace" is a dedicated platform exclusively designed for
                        graduates of Tshwane University of Technology (TUT). The platform
                        aims to keep alumni connected and informed about each other's
                        post-graduate journeys. It offers features such as updating profiles
                        with professional achievements and life events, sharing success
                        stories to inspire fellow graduates, and a special section for job
                        openings matching alumni skills. The platform also facilitates
                        instant online conversations among graduates, providing a space
                        for advice, networking, and sharing thoughts. "AlumniSpace" serves
                        as a trusted companion, empowering TUT graduates to stay
                        connected, update their profiles, explore job opportunities, and
                        engage in a thriving community of shared experiences and learning.</p>

                    <h1>

                        GOALS AND OBJECTIVES

                    </h1>
                    <p>-Graduates can tell everyone about their new jobs, projects, or things they're proud of. </p>
                    <p>-Sharing their experiences can make other graduates excited and motivated to do well too.</p>
                    <p>-Alumnis can see job openings that match what they studied, making job hunting easier.</p>
                    <p>- Graduates can talk to their friends at TUT even after they finish studying.</p>
                    <p>Graduates can chat instantly with friends and other graduates, no matter where they are.</p>
                    <p>-The system is made simple so that even people who aren't good with technology can use it.</p>
                    <p>-Staying connected with the university helps the alumnis learn about new opportunities and events.</p>
                    <p>-The system helps TUT understand what alumnis are doing after they have completed their studies. </p>
                    <p>-This tracking can show how successful TUT alumnis are and how they're contributing to the world.</p>

                </div>

            </div>
            <div className='footer'>
                <Footer />
            </div>
        </div>
    )

}

export default Home;