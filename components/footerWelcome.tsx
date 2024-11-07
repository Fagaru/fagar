const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-bold">Use cases</h4>
            <ul>
              <li>UI Design</li>
              <li>UX Design</li>
              <li>Wireframing</li>
              <li>Diagramming</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold">Explore</h4>
            <ul>
              <li>Design</li>
              <li>Prototyping</li>
              <li>Development Features</li>
              <li>Collaboration Features</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold">Resources</h4>
            <ul>
              <li>Blog</li>
              <li>Best Practices</li>
              <li>Color Wheel</li>
              <li>Support</li>
            </ul>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  