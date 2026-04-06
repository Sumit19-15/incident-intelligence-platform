import { useEffect, useState } from "react";
import { useIncidentStore } from "../stores/useIncidentStore.js";
import MapView from "../components/MapView.jsx";
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { Filter, Plus, Clock, CheckCircle } from "lucide-react";

function Home() {
  const {
    incidents,
    fetchIncidents,
    subscribeToEvents,
    unsubscribeFromEvents,
  } = useIncidentStore();
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeId, setActiveId] = useState(null); // Track which incident is clicked
  const navigate = useNavigate();

  useEffect(() => {
    fetchIncidents();
    subscribeToEvents();
    return () => unsubscribeFromEvents();
  }, []);

  const filteredIncidents = incidents.filter(
    (i) => statusFilter === "All" || i.status === statusFilter,
  );

  return (
    <div className="flex flex-col h-screen bg-[#f8fafc]">
      <Navbar />

      <main className="flex flex-1 overflow-hidden p-6 gap-6">
        {/* LEFT SIDE: THE CIRCULAR RADAR MAP */}
        <div className="w-1/2 flex items-center justify-center">
          <MapView
            filteredData={filteredIncidents}
            activeId={activeId}
            setActiveId={setActiveId}
          />
        </div>

        {/* RIGHT SIDE: CLEAN INCIDENT FEED */}
        <div className="w-1/2 flex flex-col gap-4 max-w-2xl">
          {/* Filter Header */}
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                Live Feed{" "}
                <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
              </h2>
              <button
                onClick={() => navigate("/report")}
                className="bg-blue-600 text-white pl-3 pr-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-200"
              >
                <Plus size={18} /> Report
              </button>
            </div>

            <div className="relative">
              <Filter
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
              <select
                className="w-full pl-10 pr-4 py-2.5 border border-gray-100 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none appearance-none font-medium text-gray-600"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Incidents</option>
                <option value="active">Active Only</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>

          {/* Scrollable List */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {filteredIncidents.map((incident) => (
              <div
                key={incident._id}
                onClick={() => setActiveId(incident._id)}
                className={`group p-5 rounded-3xl border transition-all cursor-pointer bg-white
                  ${
                    activeId === incident._id
                      ? "border-blue-500 ring-4 ring-blue-50 border-opacity-100 shadow-md"
                      : "border-gray-100 hover:border-gray-300 shadow-sm"
                  }
                `}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                          incident.priority === "high"
                            ? "bg-red-500 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {incident.priority}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {incident.type}
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors capitalize">
                      {incident.title}
                    </h4>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                      {incident.description}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    {incident.status === "active" ? (
                      <Clock size={18} className="text-orange-400" />
                    ) : (
                      <CheckCircle size={18} className="text-green-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
