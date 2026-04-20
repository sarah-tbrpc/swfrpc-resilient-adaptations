import React from 'react';
import { Droplet, Leaf, Shield, Waves, TreePine, Droplets, Home, Wrench, Anchor, Building, Wind, Sun, AlertTriangle, CloudRain, Flame, Thermometer } from 'lucide-react';

export const locationsData = [
  {
    id: 'st-armands',
    title: 'St. Armands Circle Adaptation',
    tabLabel: 'St. Armands Circle',
    location: 'Sarasota County',
    description: 'Illustrates how a flood-prone commercial district could be improved through targeted elevation, improved stormwater management, and shoreline stabilization.',
    imageUrl: import.meta.env.BASE_URL + 'general-img-landscape.png',
    isSideBySideSplit: true,
    beforeLabel: "Current Vulnerabilities",
    afterLabel: "Resilient Adaptation",
    beforeDesc: "Frequent flooding in low-lying areas, limited drainage during high tide, minimal shoreline protection under surge conditions, and extensive paved surfaces contributing to runoff.",
    afterDesc: "Reduced flooding in key areas due to elevation changes, improved drainage through pumped conveyance and added storage, increased infiltration, and more stable shoreline conditions.",
    vulnerability: (
      <>
        <p className="mb-6">
          St. Armands Circle is located on St. Armands Key, a barrier island positioned between Sarasota Bay and the Gulf. The site is directly exposed to tidal fluctuations and storm surge from both coastal and bay-side conditions.
        </p>
        <p className="mb-6">
          Ground elevations across the site range from approximately 4 to 7 feet NAVD88, placing portions of the roadway network within the range of regular high-tide flooding<sup className="text-[10px] text-slate-400 ml-0.5">[1]</sup>. These conditions result in periodic roadway overtopping, reduced site accessibility, and constrained evacuation routes.
        </p>
        <p className="">
          The existing stormwater system relies on gravity to move water to adjacent tidal waters. During high tide or storm surge, elevated water levels can prevent discharge or cause backflow into the system. Elevated groundwater levels further limit the capacity of the ground to absorb water. When rainfall occurs during high tide, water accumulates on the surface and drains slowly. Seawalls provide partial protection from surge but do not address internal drainage constraints.
        </p>
      </>
    ),
    strategy: (
      <>
        <p className="mb-6">
          The proposed approach focuses on reducing flood exposure and improving drainage performance under high water conditions.
        </p>
      </>
    ),
    strategyPoints: [
      <>Introduce permeable surfaces and landscaped stormwater features to reduce runoff and increase on-site absorption<sup className="text-[10px] text-slate-400 ml-0.5">[4]</sup>.</>,
      "Elevate key roadway segments and building access points to maintain access during flood events.",
      "Stabilize shoreline edges using vegetated systems to reduce erosion and wave impact.",
      "Install pump stations with backflow controls to maintain drainage when gravity systems are ineffective."
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
    title: 'Everglades City Adaptation',
    tabLabel: 'Everglades City',
    location: 'Collier County',
    description: 'Illustrates how a low-lying coastal community could be improved through targeted elevation, distributed water storage, and improved drainage under tidal and storm surge conditions.',
    imageUrl: import.meta.env.BASE_URL + 'general-img-landscape.png',
    isSideBySideSplit: false,
    beforeLabel: "Current Vulnerabilities",
    afterLabel: "Resilient Adaptation",
    beforeDesc: "Frequent and prolonged flooding, limited drainage capacity, minimal elevation differences, and widespread standing water following tidal and rainfall events.",
    afterDesc: "Reduced flood exposure in elevated areas, improved water distribution through added storage, more effective retention within natural systems, and improved drainage in targeted locations.",
    vulnerability: (
      <>
        <p className="mb-6">
          Everglades City is located along the edge of the Gulf of Mexico within the Ten Thousand Islands region. The area is characterized by very low elevations, limited topographic relief, and direct exposure to tidal influence and coastal surge.
        </p>
        <p className="mb-6">
          Ground elevations across the developed areas generally range from approximately 2 to 5 feet NAVD88, placing much of the site within the range of regular tidal flooding and storm surge impacts<sup className="text-[10px] text-slate-400 ml-0.5">[1]</sup>. Flooding often results in standing water across roadways and properties, with limited natural drainage due to minimal slope.
        </p>
        <p className="">
          The existing drainage system is limited and relies on shallow conveyance and natural storage. High tide and surge conditions restrict outflow, while elevated groundwater reduces infiltration capacity. As a result, water remains on the surface for extended periods following rainfall and tidal events.
        </p>
      </>
    ),
    strategy: (
      <>
        <p className="mb-6">
          The proposed approach focuses on reducing flood exposure and improving water storage and drainage performance under high water conditions.
        </p>
      </>
    ),
    strategyPoints: [
      "Elevate critical structures and roadway segments to reduce direct flood exposure.",
      "Introduce distributed storage areas and landscaped retention features to hold and slow stormwater.",
      "Preserve and expand natural systems, including mangroves, to improve water retention and reduce surge impact.",
      "Install localized pump systems where needed to assist drainage during high tide conditions."
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
    title: 'Fort Myers Beach Adaptation',
    tabLabel: 'Fort Myers Beach',
    location: 'Lee County',
    description: 'Illustrates how a developed barrier island corridor could be improved through elevation, shoreline stabilization, and enhanced stormwater management under storm surge and coastal flooding conditions.',
    imageUrl: import.meta.env.BASE_URL + 'general-img-landscape.png',
    isSideBySideSplit: false,
    beforeLabel: "Current Vulnerabilities",
    afterLabel: "Resilient Adaptation",
    beforeDesc: "Frequent coastal flooding, limited drainage during high tide, shoreline erosion, and constrained access along the primary roadway.",
    afterDesc: "Reduced flooding along elevated routes, improved shoreline stability, increased stormwater storage, and more reliable drainage through pumped systems and backflow prevention.",
    vulnerability: (
      <>
        <p className="mb-6">
          Fort Myers Beach is located on Estero Island along the Gulf of Mexico. The site is a narrow barrier island with direct exposure to coastal storm surge, wave action, and tidal flooding.
        </p>
        <p className="mb-6">
          Ground elevations across much of the developed area generally range from approximately 3 to 6 feet NAVD88, placing roadways and structures within the range of storm surge and high-tide flooding events<sup className="text-[10px] text-slate-400 ml-0.5">[1]</sup>. Flooding can result in roadway overtopping, property impacts, and disruption to access along the island's primary corridor.
        </p>
        <p className="">
          The existing stormwater system relies on a combination of gravity drainage and limited mechanical systems. During surge events and high tide, discharge capacity is reduced, and backflow can occur. The narrow island geometry limits opportunities for storage and increases exposure to wave-driven flooding.
        </p>
      </>
    ),
    strategy: (
      <>
        <p className="mb-6">
          The proposed approach focuses on reducing flood exposure, maintaining access, and improving shoreline and drainage performance.
        </p>
      </>
    ),
    strategyPoints: [
      "Elevate key roadway segments and access points to maintain connectivity during flood events.",
      "Improve shoreline protection using stabilized vegetated systems and reinforced edges to reduce erosion and wave impact.",
      "Introduce permeable surfaces and localized storage features to reduce runoff and surface flooding.",
      "Expand pump capacity and install backflow controls to maintain drainage during high water conditions."
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
