import React from 'react';
const DesktopIcons = () => (
  <div className="d-flex gap-4 fs-4 mt-3">
    <span title="Windows" style={{ cursor: 'pointer' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
        <path d="M0 2.5A2.5 2.5 0 0 1 2.5 0h11A2.5 2.5 0 0 1 16 2.5v11A2.5 2.5 0 0 1 13.5 16h-11A2.5 2.5 0 0 1 0 13.5zM2.5 1a1.5 1.5 0 0 0-1.5 1.5v4.99L7 7.5V1H2.5zm5.5 0v6.5l7 6.49V2.5a1.5 1.5 0 0 0-1.5-1.5H8zm7 7v4.99A1.5 1.5 0 0 0 13.5 15H8V8.5h7zM7 15v-6.5L1 8.51v4.99A1.5 1.5 0 0 0 2.5 15H7z"/>
      </svg>
    </span>
    <span title="macOS" style={{ cursor: 'pointer' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
        <path d="M12.44 14.814c.731-.383 1.258-1.252 1.157-2.315-.098-1.055-.668-1.956-1.39-2.33-.707-.376-1.493-.377-2.122 0-.643.374-1.118 1.154-1.229 2.22-.092 1.054.434 1.954 1.185 2.327.75.378 1.536.377 2.378-.29zm-2.01-8.527c.691-.716 1.639-1.252 2.766-1.127 1.12.122 1.83.676 2.26 1.408.406.702.44 1.58.077 2.459-.364.88-.936 1.708-1.748 2.214-1.42 1.01-3.23.824-4.5-.478-1.026-1.066-1.34-2.73-1.09-4.225.26-1.633 1.173-2.924 2.635-3.61.645-.302 1.417-.375 2.1-.212 0 0 0-.001-.001-.001-.02 0-.038.005-.058.006-.85.122-1.554.557-1.914 1.067-.323.447-.48 1.025-.395 1.62.083.595.394 1.122.88 1.517zM9.444 0C6.985 0 4.22 3.12 4.22 7.02c0 3.737 2.764 7.03 5.224 7.03 2.652 0 4.542-3.293 4.542-7.03 0-3.9-1.89-7.02-4.542-7.02z"/>
      </svg>
    </span>
    <span title="Linux" style={{ cursor: 'pointer' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
        <path d="M12.3 8a3.5 3.5 0 0 1 0 7H3.7A3.5 3.5 0 0 1 0 11.5c0-.77.16-1.5.47-2.14l.02-.03.04-.04c.3-.3.65-.54 1.05-.73A3.51 3.51 0 0 1 4.5 8h7.5c.27 0 .52.02.75.05.25.02.48.06.69.1l.01.01c.21.05.41.12.59.2.18.09.34.19.49.3.15.11.29.23.4.37.1.14.19.28.27.43.07.16.13.33.18.5.05.17.09.34.11.53.02.19.03.38.03.58 0 .54-.08 1.06-.24 1.56-.16.5-.4.97-.7 1.4A3.504 3.504 0 0 1 12.3 8zM4.5 9.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7.5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
      </svg>
    </span>
  </div>
);

const ApiCubesGraphic = () => {

  return (
    <svg 
      viewBox="0 0 400 300" 
      xmlns="http://www.w3.org/2000/svg" 
      className="img-fluid" 
      style={{ minWidth: '350px' }}
    >
      <defs>
        <filter id="shadow">
          <feDropShadow dx="3" dy="3" stdDeviation="2" floodColor="#000" floodOpacity="0.2"/>
        </filter>
        <style>
          {`
            .cube-purple-dark { fill: #5a3c9b; }
            .cube-purple-light { fill: #8b5cf6; }
            .cube-orange-dark { fill: #d97706; }
            .cube-orange-light { fill: #f97316; }
            .cube-white { fill: #ffffff; }
            .cube-shadow { filter: url(#shadow); }
            .text-outline {
              font-weight: bold;
              font-size: 80px;
              stroke: #ffffff; 
              stroke-width: 3;
              paint-order: stroke fill;
              fill: #4c3792; /* Match primary purple tone */
            }
          `}
        </style>
      </defs>

      <g transform="translate(10, 50) scale(1.1) rotate(0)">
        <polygon className="cube-purple-dark cube-shadow" points="100,0 200,50 200,150 100,100" />
        <polygon className="cube-purple-light" points="100,0 200,50 100,100 0,50" />
        <polygon className="cube-purple-dark" points="0,50 100,100 100,200 0,150" />
        <text x="50" y="140" className="text-outline" textAnchor="middle" transform="translate(0, -10)">A</text>
      </g>

      <g transform="translate(110, 50) scale(1.1) rotate(0)">
        <polygon className="cube-orange-dark cube-shadow" points="100,0 200,50 200,150 100,100" />
        <polygon className="cube-orange-light" points="100,0 200,50 100,100 0,50" />
        <polygon className="cube-orange-dark" points="0,50 100,100 100,200 0,150" />
        <text x="50" y="140" className="text-outline" textAnchor="middle" transform="translate(0, -10)">P</text>
      </g>
      
      <g transform="translate(210, 50) scale(1.1) rotate(0)">
        <polygon className="cube-purple-dark cube-shadow" points="100,0 200,50 200,150 100,100" />
        <polygon className="cube-purple-light" points="100,0 200,50 100,100 0,50" />
        <polygon className="cube-purple-dark" points="0,50 100,100 100,200 0,150" />
        <text x="50" y="140" className="text-outline" textAnchor="middle" transform="translate(0, -10)">I</text>
      </g>
    </svg>
  );
};

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom border-1 border-light-subtle">
    <div className="container px-4 px-lg-5">
      <a className="navbar-brand text-dark fs-3 fw-bold" href="#home">
        Post<span className="text-primary">man</span>
      </a>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
          {['Product', 'Solutions', 'Pricing', 'Enterprise', 'Why Postman', 'Resources'].map((item, index) => (
            <li className="nav-item dropdown px-2" key={index}>
              <a 
                className="nav-link text-dark" 
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                {item} <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16"><path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>
              </a>
            </li>
          ))}
        </ul>

        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-outline-dark border-0 fw-bold" type="button">
            Contact Sales
          </button>
          <button className="btn btn-outline-dark fw-bold" type="button">
            Sign In
          </button>
          <button className="btn btn-warning fw-bold text-white px-4 py-2" type="button">
            Sign Up for Free
          </button>
        </div>
      </div>
    </div>
  </nav>
);

const AlertBanner = () => (
  <div className="bg-warning-subtle text-dark-emphasis py-2 px-3 fw-medium d-flex justify-content-center align-items-center"
       style={{ backgroundColor: '#f97316', color: 'white' }}>
    <div className="container d-flex justify-content-center align-items-center gap-2">
        <span className="text-white">
          <strong className='fw-bold'>82% of orgs are API-first.</strong> Collaboration and velocity depend on it.
        </span>
        <a href="#report" className="text-white fw-bold text-decoration-underline" style={{ textDecorationColor: 'white' }}>
          Read the report →
        </a>
        <button type="button" className="btn-close btn-close-white ms-auto" aria-label="Close" onClick={() => {
        }}></button>
    </div>
  </div>
);

const HeroSection = () => (
  <div className="container px-4 px-lg-5 py-5">
    <div className="row align-items-center">
      
      <div className="col-lg-6 col-md-12 mb-5 mb-lg-0">
        <h1 className="display-4 fw-bolder" style={{ fontSize: '3.5rem', lineHeight: '4rem' }}>
          AI needs context. <br />APIs deliver it.
        </h1>
        <p className="lead mt-4 text-secondary" style={{ maxWidth: '450px' }}>
          Postman is the platform where teams build those APIs together. With built-in support for the Model Context Protocol (MCP), Postman helps you design, test, and manage APIs that power both human workflows and intelligent agents.
        </p>
        
        <div className="d-flex flex-column flex-sm-row gap-3 mt-5">
          <button className="btn btn-warning text-white btn-lg px-5 py-3 fw-bold shadow-sm" type="button">
            Sign Up for Free
          </button>
          <button className="btn btn-outline-secondary btn-lg px-5 py-3 fw-bold" type="button" style={{ borderColor: '#6c757d', color: '#6c757d' }}>
            Watch a Demo
          </button>
        </div>
        
        <div className="mt-5 pt-3">
          <p className="text-muted fw-medium mb-2">Download the desktop app for</p>
          <DesktopIcons />
        </div>
      </div>
      
      <div className="col-lg-6 col-md-12 d-flex justify-content-center">
        <ApiCubesGraphic />
      </div>

    </div>
  </div>
);


const PostmanLandingPage = () => {
  return (
    <div className="postman-clone">
      <Navbar />
      <AlertBanner />
      <HeroSection />
    </div>
  );
};

export default PostmanLandingPage;
