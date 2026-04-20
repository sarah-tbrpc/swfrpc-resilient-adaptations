import React from 'react';
import { Droplet, Leaf, Shield, Waves, TreePine, Droplets, Home, Wrench, Anchor, Building, Wind, Sun, AlertTriangle, CloudRain, Flame, Thermometer } from 'lucide-react';

export const locationsData = [
  {
    id: 'st-armands',
    title: 'St. Armands Circle Adaptation',
    tabLabel: 'St. Armands Circle',
    location: 'Sarasota County',
    description: 'Illustrating a transition from a flood-exposed commercial district to a green-first, adaptive coastal environment.',
    imageUrl: import.meta.env.BASE_URL + 'general-img-landscape.png',
    isSideBySideSplit: true,
    beforeLabel: "Current Vulnerabilities",
    afterLabel: "Resilient Adaptation",
    beforeDesc: "Recurrent king-tide flooding, overwhelmed gravity-fed storm drains, low seawalls, and heat-island effects from extensive impervious pavement.",
    afterDesc: "Bioswales, elevated shop entrances, permeable pavers, reinforced living shorelines, and advanced pump stations with backflow prevention.",
    vulnerability: (
      <>
        <p className="text-slate-600 mb-6 leading-relaxed">
          St. Armands Circle is highly exposed to sea-level rise and storm surge. With average elevations
          only a few feet above sea level, seasonal king tides regularly inundate streets<sup className="text-[10px] text-slate-400 ml-0.5">[1]</sup>,
          disrupting businesses and obstructing evacuation routes.
        </p>
        <p className="text-slate-600 leading-relaxed">
          The district's existing gray infrastructure—concrete seawalls and aging gravity-fed storm drains—is increasingly
          submerged by a rising water table, limiting its effectiveness when rainfall events coincide with high tides<sup className="text-[10px] text-slate-400 ml-0.5">[2]</sup>.
        </p>
      </>
    ),
    strategy: (
      <>
        <p className="text-slate-600 mb-6 leading-relaxed">
          The recommended approach pairs a <strong>Nature-Based Solutions (NBS)</strong> framework with targeted structural
          elevations—designing with the water rather than against it<sup className="text-[10px] text-slate-400 ml-0.5">[3]</sup>.
        </p>
      </>
    ),
    strategyPoints: [
      <>Deploying biofiltration and permeable surfaces to offset stormwater runoff<sup className="text-[10px] text-slate-400 ml-0.5">[4]</sup>.</>,
      "Elevating critical roadways and commercial ground-floors above projected flood plains.",
      "Transforming coastal edges into living shorelines.",
      "Adding mechanical pump stations with backflow preventers."
    ],
    features: [
      { icon: Droplet, title: "Permeable Pavers", description: "Replacing asphalt in parking areas and walkways with permeable materials to allow stormwater to naturally infiltrate the water table.", position: { top: "80%", left: "62%" } },
      { icon: TreePine, title: "Bioswales & Rain Gardens", description: "Vegetated channels along the street edges that absorb, clean, and slow down runoff water during heavy storms.", position: { top: "60%", left: "70%" } },
      { icon: Waves, title: "Living Shorelines", description: "Replacing rigid bulkheads with stepped terraces, mangroves, and oyster reefs to break wave energy and prevent erosion.", position: { top: "45%", left: "85%" } },
      { icon: Droplets, title: "Advanced Pumping", description: "Strategically placed mechanical pumps fitted with one-way valves to stop seawater from surging up drain pipes.", position: { top: "85%", left: "88%" } },
      { icon: Shield, title: "Elevated Infrastructure", description: "Raising the crown of critical roads and requiring new constructions or heavy remodels to elevate the first floor above the base flood elevation.", position: { top: "35%", left: "65%" } },
      { icon: Leaf, title: "Salt-Tolerant Canopies", description: "Planting native, salt-tolerant trees to combat the urban heat island effect while anchoring the soil.", position: { top: "50%", left: "78%" } }
    ],
    vulnerabilityFeatures: [
      { icon: Waves, title: "King Tide Inundation", description: "Recurring peak tides overtop low curbs, flooding crosswalks and shopfronts several times per year without any storm event.", position: { top: "70%", left: "22%" } },
      { icon: CloudRain, title: "Stormwater Backup", description: "Gravity-fed drains submerge in the rising water table, allowing tidal water to push back up through grates during rain events.", position: { top: "85%", left: "40%" } },
      { icon: AlertTriangle, title: "Low Seawalls", description: "Existing bulkheads along Circle Drive sit only inches above mean high water, providing no freeboard against surge splash.", position: { top: "48%", left: "12%" } },
      { icon: Thermometer, title: "Urban Heat Island", description: "Unshaded asphalt parking and roadways push surface temperatures far above ambient, straining energy systems and pedestrian comfort.", position: { top: "30%", left: "32%" } }
    ],
    citations: [
      { text: "Florida Department of Environmental Protection. Florida Adaptation Planning Guidebook.", url: "https://floridadep.gov/rcp/resilient-florida-program/documents/florida-adaptation-planning-guidebook" },
      { text: "City of Sarasota. Smart City and Public Works Capital Projects.", url: "https://www.sarasotafl.gov/Department-Pages/Public-Works/Capital-Projects/Smart-City" },
      { text: "St. Armands Circle Association. Stormwater History & Infrastructure.", url: "https://starmands.org/stormwater-history" }
    ]
  },
  {
    id: 'everglades',
    title: 'Everglades City Heritage Retreat',
    tabLabel: 'Everglades City',
    location: 'Collier County',
    description: 'Adapting a historic Gulf coast community to severe storm surge and sea-level rise while protecting its Ten Thousand Islands heritage.',
    imageUrl: import.meta.env.BASE_URL + 'general-img-landscape.png',
    isSideBySideSplit: false,
    beforeLabel: "Current Vulnerabilities",
    afterLabel: "Resilient Adaptation",
    beforeDesc: "Low-elevation historic structures, failing septic systems, eroded natural buffers, and repeated inundation from Gulf storm surge.",
    afterDesc: "Elevated heritage structures, restored mangrove fringes, resilient municipal wastewater systems, and amphibious dock infrastructure.",
    vulnerability: (
      <>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Everglades City sits at low elevation on the Gulf of Mexico and faces direct storm-surge exposure. Recent hurricane events have repeatedly submerged large portions of the community<sup className="text-[10px] text-slate-400 ml-0.5">[1]</sup>.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Legacy septic systems and low-elevation historic structures are poorly suited to a rising water table and intensifying storms, placing both the community's cultural heritage and the surrounding estuarine ecology at risk<sup className="text-[10px] text-slate-400 ml-0.5">[2]</sup>.
        </p>
      </>
    ),
    strategy: (
      <>
        <p className="text-slate-600 mb-6 leading-relaxed">
          A layered adaptation approach emphasizing heritage elevation and ecological restoration, integrating the built environment with the surrounding Everglades National Park ecosystem<sup className="text-[10px] text-slate-400 ml-0.5">[3]</sup>.
        </p>
      </>
    ),
    strategyPoints: [
      "Elevating historic structures on driven pilings.",
      "Restoring fringing mangrove forests to break wave energy.",
      "Replacing failing septic systems with resilient municipal wastewater tech.",
      "Adapting docks and waterfronts for variable water levels."
    ],
    features: [
      { icon: Home, title: "Elevated Heritage", description: "Carefully raising historic wooden structures above base flood elevation while preserving architectural integrity.", position: { top: "30%", left: "60%" } },
      { icon: TreePine, title: "Mangrove Buffers", description: "Replanting and protecting dense mangrove thickets along the coastline to naturally attenuate storm surge.", position: { top: "70%", left: "80%" } },
      { icon: Wrench, title: "Resilient Utilities", description: "Moving electrical panels, HVAC, and critical infrastructure to elevated platforms well above projected surge lines.", position: { top: "45%", left: "70%" } },
      { icon: Anchor, title: "Amphibious Docks", description: "Floating dock systems that rise and fall with extreme tides and surges without structural failure.", position: { top: "80%", left: "90%" } },
      { icon: Leaf, title: "Stormwater Parks", description: "Designated low-lying green spaces intended to safely flood and hold excess storm water from heavy rainfall.", position: { top: "60%", left: "65%" } }
    ],
    vulnerabilityFeatures: [
      { icon: Waves, title: "Gulf Storm Surge", description: "Direct exposure to the Gulf of Mexico drives repeated surge events that submerge streets and ground floors during hurricanes.", position: { top: "55%", left: "15%" } },
      { icon: Home, title: "Low-Elevation Heritage", description: "Historic wood-frame structures sit near grade, unable to withstand even modest flood events without major damage.", position: { top: "35%", left: "30%" } },
      { icon: CloudRain, title: "Septic Saturation", description: "Rising groundwater saturates aging septic drain fields, contaminating yards and the surrounding estuary after heavy rain.", position: { top: "80%", left: "35%" } },
      { icon: AlertTriangle, title: "Buffer Erosion", description: "Thinning mangrove fringe has reduced the natural surge-attenuation zone that historically shielded the community.", position: { top: "70%", left: "10%" } }
    ],
    citations: [
      { text: "Florida Department of Environmental Protection. Florida Adaptation Planning Guidebook.", url: "https://floridadep.gov/rcp/resilient-florida-program/documents/florida-adaptation-planning-guidebook" },
      { text: "Collier County Government (2023). Coastal Resilience and Master Flood Protection Plan.", url: "https://www.colliercountyfl.gov/government/operations/resiliency-and-sustainability" },
      { text: "U.S. Army Corps of Engineers. Collier County Coastal Storm Risk Management Feasibility Study.", url: "https://www.saj.usace.army.mil/CollierCountyCSRMFeasibilityStudy/" },
      { text: "South Florida Water Management District. 2023 Sea Level Rise and Flood Resiliency Plan.", url: "https://www.sfwmd.gov/sites/default/files/documents/SFWMD_2023_SLR%26FRP_FINAL_0.pdf" }
    ]
  },
  {
    id: 'fort-myers',
    title: 'Fort Myers Beach Riverfront',
    tabLabel: 'Fort Myers Beach',
    location: 'Lee County',
    description: 'Rebuilding the Estero Island back-bay ecosystem and commercial waterfront for dynamic flood resilience and post-storm economic recovery.',
    imageUrl: import.meta.env.BASE_URL + 'general-img-landscape.png',
    isSideBySideSplit: false,
    beforeLabel: "Current Vulnerabilities",
    afterLabel: "Resilient Adaptation",
    beforeDesc: "Catastrophic storm-surge damage to ground-level commercial space, collapsed rigid bulkheads, and deep scour around building foundations.",
    afterDesc: "Breakaway ground floors, elevated boardwalk corridors, terraced living shorelines, and hardened utility micro-grids.",
    vulnerability: (
      <>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Fort Myers Beach's bayside commercial corridor sustained catastrophic damage during Hurricane Ian, with storm surge destroying ground-level structures and critical infrastructure<sup className="text-[10px] text-slate-400 ml-0.5">[1]</sup>.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Aging vertical bulkheads failed under extreme pressure, and the absence of a natural buffer allowed surge to scour foundations and erode long sections of the coastal edge<sup className="text-[10px] text-slate-400 ml-0.5">[2]</sup>.
        </p>
      </>
    ),
    strategy: (
      <>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Rebuild guidance favors a shift from purely gray infrastructure to green-gray hybrids—pairing hardened, elevated commercial structures with absorptive living shorelines to protect both the economy and the ecosystem<sup className="text-[10px] text-slate-400 ml-0.5">[3]</sup>.
        </p>
      </>
    ),
    strategyPoints: [
      <>Implementing breakaway ground-floor enclosures<sup className="text-[10px] text-slate-400 ml-0.5">[4]</sup>.</>,
      "Transitioning from concrete bulkheads to living shorelines with oyster reefs.",
      "Connecting elevated boardwalks for continuous pedestrian access during floods.",
      "Creating natural stormwater retention berms."
    ],
    features: [
      { icon: Building, title: "Breakaway Floors", description: "Ground floors designed with breakaway walls that allow storm surge to pass through without compromising structural supports.", position: { top: "50%", left: "65%" } },
      { icon: Sun, title: "Elevated Boardwalks", description: "Moving the main pedestrian commercial corridor to an elevated second-tier boardwalk to maintain access and safety.", position: { top: "65%", left: "75%" } },
      { icon: Waves, title: "Oyster Shell Reefs", description: "Installing living reefs along the riverfront to filter water and break wave velocity before it hits the shore.", position: { top: "85%", left: "88%" } },
      { icon: Shield, title: "Hardened Facilities", description: "Building critical infrastructure (power, water, emergency services) to withstand Category 5 wind and surge forces.", position: { top: "30%", left: "80%" } },
      { icon: Wind, title: "Micro-Grids", description: "Localized energy and battery storage systems deployed high above flood lines to ensure power resilience post-storm.", position: { top: "20%", left: "60%" } }
    ],
    vulnerabilityFeatures: [
      { icon: AlertTriangle, title: "Surge Destruction", description: "Hurricane Ian's surge destroyed ground-level retail and dining along the bayside corridor, leaving exposed slab foundations.", position: { top: "55%", left: "25%" } },
      { icon: Building, title: "Bulkhead Failure", description: "Aging concrete bulkheads collapsed under surge pressure, accelerating shoreline erosion and exposing properties behind them.", position: { top: "78%", left: "15%" } },
      { icon: Waves, title: "Foundation Scour", description: "Receding surge waters scoured deep voids around pile foundations, undermining structures that remained standing.", position: { top: "70%", left: "40%" } },
      { icon: Flame, title: "Utility Loss", description: "Ground-mounted electrical and HVAC equipment submerged and failed, delaying recovery and occupancy by many months.", position: { top: "35%", left: "35%" } }
    ],
    citations: [
      { text: "Florida Department of Environmental Protection. Florida Adaptation Planning Guidebook.", url: "https://floridadep.gov/rcp/resilient-florida-program/documents/florida-adaptation-planning-guidebook" },
      { text: "ResilientLee (2024). Lee County Hurricane Ian Recovery and Resilience Plan.", url: "https://resilientlee.com/" },
      { text: "Town of Fort Myers Beach. Post-Disaster Buildback and Comprehensive Plan Resiliency Update.", url: "https://www.fortmyersbeachfl.gov/1269/Resiliency-and-Recovery" },
      { text: "Town of Fort Myers Beach. Community Development Block Grant - Disaster Recovery (CDBG-DR).", url: "https://www.fortmyersbeachfl.gov/1274/CDBG-DR" }
    ]
  }
];
