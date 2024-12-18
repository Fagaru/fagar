// pages/index.tsx
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barre de recherche */}
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex space-x-4">
          <h1 className="text-lg font-bold">Proximus Prime</h1>
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Pays, Région, Ville, Quartier"
              className="px-4 py-2 outline-none w-80"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 px-4 py-2 rounded-md"
          />
          <button className="bg-red-500 text-white px-4 py-2 rounded-md">
            Ajouter votre entreprise
          </button>
          <div className="bg-gray-200 p-2 rounded-full">👤</div>
        </div>
      </header>

      {/* Section principale */}
      <main className="p-8">
        {/* Bannière */}
        <div className="bg-gray-200 rounded-md text-center py-16 mb-8">
          <h1 className="text-4xl font-bold">Fagar inc</h1>
        </div>

        <div className="flex">
          {/* Filtres */}
          <aside className="w-1/4 p-4 bg-white shadow-md rounded-md">
            <h3 className="font-bold mb-4">Color</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>Label</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>Label</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>Label</span>
              </label>
            </div>

            <h3 className="font-bold my-4">Size</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>Label</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>Label</span>
              </label>
            </div>
          </aside>

          {/* Produits */}
          <section className="flex-1 grid grid-cols-3 gap-6 p-4">
            <div className="flex flex-col items-center bg-white p-4 rounded-md shadow-md">
              <div className="w-full h-40 bg-gray-200 rounded-md"></div>
              <h4 className="mt-4 font-bold">Text</h4>
              <p>$0</p>
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-md shadow-md">
              <div className="w-full h-40 bg-gray-200 rounded-md"></div>
              <h4 className="mt-4 font-bold">Text</h4>
              <p>$0</p>
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-md shadow-md">
              <div className="w-full h-40 bg-gray-200 rounded-md"></div>
              <h4 className="mt-4 font-bold">Text</h4>
              <p>$0</p>
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-md shadow-md">
              <div className="w-full h-40 bg-gray-200 rounded-md"></div>
              <h4 className="mt-4 font-bold">Text</h4>
              <p>$0</p>
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-md shadow-md">
              <div className="w-full h-40 bg-gray-200 rounded-md"></div>
              <h4 className="mt-4 font-bold">Text</h4>
              <p>$0</p>
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-md shadow-md">
              <div className="w-full h-40 bg-gray-200 rounded-md"></div>
              <h4 className="mt-4 font-bold">Text</h4>
              <p>$0</p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white p-8 mt-8">
        <div className="flex justify-between">
          <div>
            <h4 className="font-bold">Use cases</h4>
            <ul className="space-y-2">
              <li>UI Design</li>
              <li>UX Design</li>
              <li>Wireframing</li>
              <li>Diagramming</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold">Explore</h4>
            <ul className="space-y-2">
              <li>Design</li>
              <li>Prototyping</li>
              <li>Development Features</li>
              <li>FigJam</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold">Resources</h4>
            <ul className="space-y-2">
              <li>Blog</li>
              <li>Best Practices</li>
              <li>Support</li>
              <li>Developers</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
