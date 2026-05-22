import React from 'react';
import { Droplet, Leaf, Shield, Waves, TreePine, Droplets, Home, Wrench, Anchor, Building, Wind, Sun, Footprints } from 'lucide-react';

// SWFRPC Resilient Adaptations — four sites, ordered upstream → downstream along the
// Caloosahatchee corridor (Moore Haven → LaBelle → Fort Myers), then Naples for the
// gulf coastal perspective.
//
// imageUrl values currently point to the Nano Banana placeholder while UE renders are
// in production. Replace per site with `/{county}-{site}.jpg` when finals are ready.

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const PLACEHOLDER_IMAGE = asset('before_and_after_visualization_Nano_Banana_2_79722.jpg');

// Regional overview shown above the per-site detail.
// Map image expected at /public/regional-overview-map.png — should depict:
//   - SWFRPC six-county boundary (Charlotte, Collier, Glades, Hendry, Lee, Sarasota)
//   - Member counties (Collier, Glades, Hendry) highlighted at higher visual weight
//   - The four study-area AOIs marked with labels
//   - Caloosahatchee River as the connecting regional feature
export const regionalOverview = {
  eyebrow: 'Southwest Florida Regional Planning Council',
  title: 'Regional Resilience Across Southwest Florida',
  description: 'The Southwest Florida region spans more than 6,600 square miles, stretching from inland agricultural communities and the Caloosahatchee corridor to vulnerable Gulf coastlines. These study sites illustrate the regional flood-risk spectrum, ranging from Lake Okeechobee outflow to coastal storm surge.',
  mapImageUrl: asset('regional-overview-map.png'),
  mapAlt: 'Map of the Southwest Florida Regional Planning Council region with study area boundaries marked along the Caloosahatchee corridor and the gulf coast.',
  mapCaption: 'The six Southwest Florida Regional Planning Council counties, shown in teal: Charlotte, Collier, Glades, Hendry, Lee, and Sarasota.'
};

export const locationsData = [
  {
    id: 'moore-haven',
    tabLabel: 'Moore Haven',
    title: 'Moore Haven Caloosahatchee Adaptation',
    location: 'Moore Haven, Glades County',
    description: 'Helping a low-lying inland community on the Caloosahatchee River handle heavy rainfall and high river levels safely.',
    imageUrl: PLACEHOLDER_IMAGE,
    beforeImage: asset('Moore Haven - Before.png'),
    afterImage: asset('Moore Haven - After.png'),
    isSideBySideSplit: false,
    beforeLabel: "Current Vulnerabilities",
    afterLabel: "Resilient Adaptation",
    beforeDesc: "The riverfront is unprotected and downtown buildings are exposed. When high river levels and heavy rain hit at the same time, the area is susceptible to flooding.",
    afterDesc: "A protected waterfront with natural tree buffers, new ponds to catch rainwater, and safely elevated public buildings.",
    vulnerability: (
      <>
        <p className="text-slate-600 leading-relaxed">
          Moore Haven sits at the western outlet of Lake Okeechobee, where the Caloosahatchee River begins. Its low-lying downtown floods easily when lake releases coincide with heavy rainfall.<sup className="text-[10px] text-slate-400 ml-0.5">[1]</sup> As a lakeside community, it is also exposed to hurricane winds, intense rainfall, and storm-driven lake water that can overwhelm local defenses.<sup className="text-[10px] text-slate-400 ml-0.5">[2]</sup>
        </p>
        <figure className="mt-6 lg:flex-1 lg:flex lg:flex-col lg:min-h-0">
          <img
            src={asset('moorehaven-dam.png')}
            alt="The spillway at Moore Haven where water is released into the Caloosahatchee River."
            className="w-full h-64 lg:h-0 lg:flex-1 lg:min-h-0 object-cover object-center rounded-xl ring-1 ring-slate-200"
          />
          <figcaption className="mt-2 text-sm leading-snug text-slate-500">
            The spillway at Moore Haven that allows water to flow into the Caloosahatchee River. Photo: USACE / WGCU.
          </figcaption>
        </figure>
      </>
    ),
    strategy: (
      <>
        <p className="text-slate-300 mb-6 leading-relaxed">
          A mix of natural shoreline protection, floodproofing, and smart water storage captures rainfall and protects public spaces:<sup className="text-[10px] text-slate-400 ml-0.5">[3]</sup>
        </p>
      </>
    ),
    strategyPoints: [
      <><strong>Natural Shoreline Buffers:</strong> Planting native cypress trees and cabbage palms along the riverbank to slow down waves, stop erosion, and naturally absorb water.</>,
      <><strong>Raising Key Buildings:</strong> Elevating critical public facilities and community infrastructure so they stay dry and functional during big floods.</>,
      <><strong>Neighborhood Water Storage:</strong> Creating neighborhood ponds and green spaces that can soak up and hold heavy rainfall before it inundates downtown streets.</>,
      <><strong>Redesigning Waterfront Parks:</strong> Upgrading waterfront parks to handle fluctuating water levels safely, keeping them usable for the community.</>
    ],
    vulnerabilityFeatures: [
      { icon: Building, title: "Flood-Vulnerable City Hall", description: "Moore Haven's one-story city hall sits at low elevation near the Caloosahatchee, leaving essential municipal operations and records exposed to compound flooding.", position: { top: "70%", left: "70%" }, image: asset('City-Hall.png'), imageCredit: 'City of Moore Haven', popupPosition: "bottom-left" },
      { icon: Leaf, title: "Missed Green Infrastructure Opportunities", description: "Cleared, impervious lots near the waterfront shed stormwater straight to the canal. Bioswales, rain gardens, and permeable surfaces here could capture runoff and ease compound flooding.", position: { top: "89%", left: "8%" }, image: asset('Emptylots.png'), imageCredit: 'Google Maps', popupPosition: "bottom-left" },
      { icon: Waves, title: "Unprotected Shoreline Edge", description: "Limited buffer between the canal and downtown leaves buildings, streets, and infrastructure exposed to flooding, wave action, and erosion.", position: { top: "26%", left: "79%" }, image: asset('welcome_to_Moore_Haven.jpg'), imageCredit: 'Glades County Tourism' }
    ],
    features: [
      { icon: Leaf, title: "Green Infrastructure", description: "Bioswales, rain gardens, and permeable surfaces now capture and filter stormwater on the once-bare lots, easing runoff to the canal and reducing compound flooding downtown.", position: { top: "89%", left: "8%" }, popupPosition: "bottom-left" },
      { icon: Building, title: "Resilient City Hall", description: "City hall is elevated above the base flood elevation and rebuilt to resilient construction standards adopted throughout downtown, keeping essential municipal services and records operating during flood events.", position: { top: "70%", left: "70%" }, popupPosition: "bottom-left" },
      { icon: Waves, title: "Living Shoreline Buffer", description: "A vegetated buffer and rock revetment now armor the canal edge while a waterfront promenade reconnects downtown to the water. Together they absorb wave energy, stabilize the bank against erosion, and create a protective setback between the canal and the community.", position: { top: "26%", left: "79%" } }
    ],
    citations: [
      { text: "South Florida Water Management District. Caloosahatchee River Watershed Protection Plan.", url: "https://www.sfwmd.gov/our-work/caloosahatchee-river" },
      { text: "Glades County Local Mitigation Strategy.", url: "https://www.myglades.com/departments/public_safety/emergency_management/mitigation/index.php" },
      { text: "Florida Department of Environmental Protection. Florida Adaptation Planning Guidebook.", url: "https://floridadep.gov/rcp/resilient-florida-program/documents/florida-adaptation-planning-guidebook" }
    ]
  },
  {
    id: 'labelle',
    tabLabel: 'LaBelle',
    title: 'LaBelle Riverfront Heritage Adaptation',
    location: 'LaBelle, Hendry County',
    description: 'Protecting a downstream Caloosahatchee community from compound flooding driven by upstream lock releases, local rainfall, and tidal backwater.',
    imageUrl: PLACEHOLDER_IMAGE,
    beforeImage: asset('LaBelle Before.png'),
    afterImage: asset('LaBelle After.png'),
    baseImageryCredit: 'marinas.com',
    isSideBySideSplit: false,
    beforeLabel: "Current Vulnerabilities",
    afterLabel: "Resilient Adaptation",
    beforeDesc: "Compound flooding from upstream releases, local rainfall, and tidal backwater leaves an unprotected shoreline, exposed marina, and low elevation downtown vulnerable to inundation.",
    afterDesc: "Living shorelines along the Caloosahatchee, an elevated riverwalk and shaded pavilions at the marina, and inland stormwater retention reduce exposure across the riverfront and civic core during compound flood events.",
    vulnerability: (
      <>
        <p className="text-slate-600 leading-relaxed">
          LaBelle sits on the Caloosahatchee River between the Ortona Lock (S-78) upstream and the Franklin Lock (S-79) downstream, putting the town directly in the path of water moving from Lake Okeechobee toward the coast<sup className="text-[10px] text-slate-400 ml-0.5">[1]</sup>. As the seat of Hendry County and a working agricultural community known for ranching, citrus, and sugar, its small downtown, courthouse, and riverfront marinas sit at low elevations along the bank.
        </p>
        <figure className="mt-6 lg:flex-1 lg:flex lg:flex-col lg:min-h-0">
          <img
            src={asset('maxresdefault.jpg')}
            alt="Floodwater across a road in LaBelle, Florida following heavy rainfall and high river levels."
            className="w-full h-64 lg:h-0 lg:flex-1 lg:min-h-0 object-cover object-center rounded-xl ring-1 ring-slate-200"
          />
          <figcaption className="mt-2 text-sm leading-snug text-slate-500">
            Flooding along the Caloosahatchee River corridor in LaBelle during a high-water event. Photo: Gulf Coast News.
          </figcaption>
        </figure>
      </>
    ),
    strategy: (
      <>
        <p className="text-slate-300 mb-6 leading-relaxed">
          A working waterfront adaptation approach that stabilizes the riverbank, elevates the buildings the county depends on, and gives stormwater somewhere to go before it reaches the river:
        </p>
      </>
    ),
    strategyPoints: [
      <><strong>Living Shorelines:</strong> Native cypress and floodplain plantings along the Caloosahatchee to stabilize the bank, reduce erosion from passing flows, and absorb floodwater during high river events.</>,
      <><strong>Elevated Riverwalk and Public Space:</strong> A continuous elevated boardwalk along the riverbank with shaded pavilions, providing public access and recreation that stays usable through high water.</>,
      <><strong>Upland Stormwater Retention:</strong> Bioswales, rain gardens, and small retention areas in residential and commercial streetscapes to catch local rainfall before it compounds with what is coming down the river.</>
    ],
    // Placeholder positions — reposition for the new LaBelle imagery.
    vulnerabilityFeatures: [
      { icon: Waves, title: "Unprotected Riverbank", description: "Bare shoreline exposed to erosion from passing flows and rising water during compound flood events.", position: { top: "36%", left: "33%" }, popupPosition: "bottom-left" },
      { icon: Footprints, title: "Limited Riverfront Access", description: "A narrow strip of land between the river and downtown offers little continuous public access and no elevated refuge during high water.", position: { top: "64%", left: "71%" }, popupPosition: "bottom-left" }
    ],
    features: [
      { icon: Waves, title: "Living Shoreline", description: "Native cypress and floodplain plantings stabilize the bank, slow erosion, and absorb floodwater during high river events.", position: { top: "36%", left: "33%" }, popupPosition: "bottom-left" },
      { icon: TreePine, title: "Elevated Riverwalk & Riparian Buffer", description: "A continuous boardwalk lifts public access above flood elevation and remains usable as river levels rise and fall. Restored tree cover and native plantings along the bank filter runoff and provide habitat while reinforcing the shoreline.", position: { top: "64%", left: "71%" }, popupPosition: "bottom-left" }
    ],
    citations: [
      { text: "Florida Department of Environmental Protection. Florida Adaptation Planning Guidebook.", url: "https://floridadep.gov/rcp/resilient-florida-program/documents/florida-adaptation-planning-guidebook" },
      { text: "South Florida Water Management District. Caloosahatchee River Watershed Protection Plan.", url: "https://www.sfwmd.gov/our-work/caloosahatchee-river" },
      { text: "City of LaBelle Comprehensive Plan.", url: "https://www.citylabelle.com/" },
      { text: "Hendry County Local Mitigation Strategy.", url: "https://www.hendryfla.net/" }
    ]
  },
  {
    id: 'fort-myers-riverfront',
    tabLabel: 'Fort Myers',
    title: 'Fort Myers Downtown Riverfront',
    location: 'Fort Myers, Lee County',
    description: 'Reimagining downtown Fort Myers\' Caloosahatchee waterfront to protect the historic commercial district from severe storms and rising water levels.',
    imageUrl: PLACEHOLDER_IMAGE,
    beforeImage: asset('Fort Myers Riverfront Before.png'),
    afterImage: asset('Fort Myers Riverfront After.png'),
    sliderTitle: "Caloosahatchee Riverfront",
    beforeCredit: "City of Fort Myers",
    hideBaseImagery: true,
    sliderAspectRatio: 0.964,
    isSideBySideSplit: false,
    beforeLabel: "Current Vulnerabilities",
    afterLabel: "Resilient Adaptation",
    beforeDesc: "From the Caloosahatchee waterfront to the inland streets, downtown Fort Myers is exposed to storm surge on the scale of Hurricane Ian, undermined seawalls, ground-floor flooding, and pavement that funnels runoff toward the river.",
    afterDesc: "A hybrid green-gray approach reshapes the district. Living shorelines and elevated, hardened buildings line the water, while permeable streets, bioswales, and shaded plazas inland absorb stormwater and protect the historic core.",
    vulnerability: (
      <>
        <p className="text-slate-600 leading-relaxed">
          Hurricane Ian's 5 to 7 foot storm surge inundated Centennial Park, the Edison-Ford waterfront, and the downtown business corridor<sup className="text-[10px] text-slate-400 ml-0.5">[1]</sup>. The riverfront faces dual risk, coastal surge pushing inland and high water flowing down the Caloosahatchee<sup className="text-[10px] text-slate-400 ml-0.5">[2]</sup>, while aging seawalls and rising seas leave ground-floor storefronts and low-lying streets exposed to recurring storm and "sunny-day" tidal flooding that threatens the historic commercial core<sup className="text-[10px] text-slate-400 ml-0.5">[3]</sup>.
        </p>
        <figure className="mt-6 lg:flex-1 lg:flex lg:flex-col lg:min-h-0">
          <img
            src={asset('flooded-fort-myers.png')}
            alt="Storm surge flooding across the downtown Fort Myers riverfront."
            className="w-full h-64 lg:h-0 lg:flex-1 lg:min-h-0 object-cover object-center rounded-xl ring-1 ring-slate-200"
          />
          <figcaption className="mt-2 text-sm leading-snug text-slate-500">
            Storm surge flooding along the downtown Fort Myers riverfront during Hurricane Ian.
          </figcaption>
        </figure>
      </>
    ),
    strategy: (
      <>
        <p className="text-slate-300 mb-6 leading-relaxed">
          A hybrid <strong>green-gray adaptation</strong> strategy focused on integrated shoreline terracing and elevated boardwalks that dissipate wave energy and provide critical flood storage<sup className="text-[10px] text-slate-400 ml-0.5">[4]</sup>:
        </p>
      </>
    ),
    strategyPoints: [
      <><strong>Integrated Shoreline Terraces:</strong> Constructing living shorelines and constructed oyster reefs along the Caloosahatchee waterfront to break waves and reduce erosion.</>,
      <><strong>Elevated Multi-Use Boardwalks:</strong> Developing an elevated boardwalk system that provides continuous riverfront access and recreation space during high-water events.</>,
      <><strong>Permeable Upland Bioswales:</strong> Incorporating permeable streetscapes and integrated bioswales within the public plaza to manage localized stormwater runoff.</>
    ],
    vulnerabilityFeatures: [
      { icon: Waves, title: "Unprotected Seawall", description: "Aging vertical concrete seawalls offer minimal defense against severe storm surge, allowing high water to easily breach and inundate the park and downtown grid.", position: { top: "22%", left: "90%" } },
      { icon: Droplets, title: "Flood-Prone Surfaces", description: "The open grass lawn absorbs more rain than hard pavement, but still offers little real stormwater storage. During intense rainfall or river surges the soil quickly saturates, leaving standing floodwater.", position: { top: "84%", left: "82%" }, popupPosition: "top-left" }
    ],
    features: [
      { icon: Waves, title: "Living Shorelines", description: "Along the riverfront, rigid seawalls give way to terraced living shorelines of native plantings, mangroves, and oyster reefs that absorb wave energy, slow surge, and stabilize the banks against erosion.", position: { top: "22%", left: "90%" } },
      { icon: Leaf, title: "Resilient Landscape", description: "Permeable surfaces, bioswales, and restored shoreline capture stormwater where it falls, while adjacent buildings are elevated and built to resilient standards.", position: { top: "84%", left: "82%" }, popupPosition: "bottom-left" }
    ],
    additionalSliders: [
      {
        title: "Downtown Streetscape",
        beforeImage: asset('Downtown Fort Myers Before.png'),
        afterImage: asset('Downtown Fort Myers After.png'),
        beforeLabel: "Current Vulnerabilities",
        afterLabel: "Resilient Adaptation",
        isSideBySideSplit: false,
        beforeDesc: "Wide impervious streets and at-grade plazas send stormwater straight toward the river and offer little protection when surge and heavy rain overwhelm the downtown commercial corridor.",
        afterDesc: "A permeable, terraced streetscape with integrated bioswales and shaded public plazas captures runoff, slows floodwater, and keeps the downtown corridor usable during high-water events.",
        beforeCredit: "Gulfshore Life",
        hideBaseImagery: true,
        aspectRatioOverride: 0.964,
        features: [
          { icon: Leaf, title: "Permeable\nBioswale", description: "Permeable paving and planted bioswales along the streetscape capture and filter stormwater, reducing runoff and easing localized flooding in the commercial corridor.", position: { top: "91%", left: "18%" }, popupPosition: "bottom-right" }
        ],
        vulnerabilityFeatures: [
          { icon: Droplet, title: "Impervious Streetscape", description: "Continuous concrete and asphalt sheds stormwater straight toward the river with no infiltration, ponding in the commercial corridor during heavy rain.", position: { top: "91%", left: "18%" }, popupPosition: "bottom-right" }
        ]
      }
    ],
    citations: [
      { text: "USGS Hurricane Ian Storm Tide Sensor Data.", url: "https://water.usgs.gov/floods/events/2022/Ian/" },
      { text: "ResilientLee. Lee County Hurricane Ian Recovery and Resilience Plan.", url: "https://resilientlee.com/" },
      { text: "City of Fort Myers Comprehensive Plan and Resiliency Update.", url: "https://www.cityftmyers.com/" },
      { text: "Florida Department of Environmental Protection. Florida Adaptation Planning Guidebook.", url: "https://floridadep.gov/rcp/resilient-florida-program/documents/florida-adaptation-planning-guidebook" }
    ]
  },
  {
    id: 'fifth-ave-naples',
    tabLabel: 'Naples',
    title: 'Naples Beachfront Adaptation',
    location: 'Naples, Collier County',
    description: 'Rebuilding Naples\' Gulf shoreline after Hurricane Ian with restored coastal defenses and resilient elevated reconstruction.',
    imageUrl: PLACEHOLDER_IMAGE,
    beforeImage: asset('Naples - Before.png'),
    afterImage: asset('Naples - After.png'),
    isSideBySideSplit: false,
    beforeLabel: "Current Vulnerabilities",
    afterLabel: "Resilient Adaptation",
    beforeDesc: "Vacant lots left by Hurricane Ian, a narrow beach and degraded dune, and an exposed beachfront road to the Fifth Avenue South commercial district open to Gulf surge and wave runup.",
    afterDesc: "A restored and planted dune, renourished beach, elevated resilient homes built above base flood elevation, and offshore living breakwaters that dissipate wave energy before it reaches the shore.",
    vulnerability: (
      <>
        <p className="text-slate-600 leading-relaxed">
          Hurricane Ian's 6 to 7 foot storm surge struck Naples' Gulf-facing beachfront in September 2022, damaging or destroying numerous homes along Gulf Shore Boulevard<sup className="text-[10px] text-slate-400 ml-0.5">[1]</sup>; many of the most exposed properties were demolished and remain vacant today<sup className="text-[10px] text-slate-400 ml-0.5">[2]</sup>. An open shoreline with a narrow beach and thin dune system leaves these homes and the access roads behind them directly exposed to wave runup, surge, and erosion during major storms<sup className="text-[10px] text-slate-400 ml-0.5">[3]</sup>.
        </p>
        <figure className="mt-6 lg:flex-1 lg:flex lg:flex-col lg:min-h-0">
          <img
            src={asset('hurricane-beach.png')}
            alt="Storm damage along the Naples Gulf beachfront after Hurricane Ian."
            className="w-full h-64 lg:h-0 lg:flex-1 lg:min-h-0 object-cover object-center rounded-xl ring-1 ring-slate-200"
          />
          <figcaption className="mt-2 text-sm leading-snug text-slate-500">
            Storm damage along the Naples beachfront after Hurricane Ian. Photo: Naples Fire-Rescue / Weather Tracker / TMX.
          </figcaption>
        </figure>
      </>
    ),
    strategy: (
      <>
        <p className="text-slate-300 mb-6 leading-relaxed">
          A combined shoreline and built environment adaptation that rebuilds the dune as a first line of defense while raising and strengthening the homes behind it:
        </p>
      </>
    ),
    strategyPoints: [
      <><strong>Elevated Resilient Reconstruction:</strong> Rebuilding demolished properties on pilings above base flood elevation with breakaway lower floors, hurricane rated openings, and structural systems meeting current coastal high hazard standards.</>,
      <><strong>Dune Restoration &amp; Living Breakwaters:</strong> Rebuilding and widening primary dunes with sand renourishment and native plantings of sea oats, railroad vine, and beach sunflower, paired with offshore living breakwaters that dissipate wave energy and absorb surge before it reaches the shore.</>
    ],
    // Placeholder positions — reposition for the new Naples beachfront imagery.
    vulnerabilityFeatures: [
      { icon: Building, title: "Demolished Properties", description: "Lots cleared after Hurricane Ian remain vacant, leaving gaps in the beachfront and removing the buffer that structures and landscaping once provided.", position: { top: "38%", left: "52%" }, popupPosition: "bottom-right" },
      { icon: Shield, title: "Unprotected Shoreline", description: "The open Gulf shoreline has no offshore structures to break incoming waves, leaving the beach, dune, and properties behind it fully exposed to storm-driven wave energy and surge.", position: { top: "68%", left: "32%" }, popupPosition: "bottom-right" }
    ],
    features: [
      { icon: Home, title: "Elevated Resilient Construction", description: "New homes rebuilt on pilings above base flood elevation, with breakaway lower floors, hurricane rated openings, and structural systems meeting current coastal high hazard standards.", position: { top: "38%", left: "52%" }, popupPosition: "bottom-right" },
      { icon: Shield, title: "Restored Coastal Defenses", description: "A combined system of restored dunes with native plantings, a renourished beach, and offshore living breakwaters that work together to dissipate wave energy and absorb surge before it reaches the upland.", position: { top: "68%", left: "32%" }, popupPosition: "bottom-right", image: asset('scape_living-breakwaters_03.jpg'), imageCredit: 'Rebuild by Design / urbanNext' }
    ],
    citations: [
      { text: "Florida Department of Environmental Protection. Florida Adaptation Planning Guidebook.", url: "https://floridadep.gov/rcp/resilient-florida-program/documents/florida-adaptation-planning-guidebook" },
      { text: "City of Naples Stormwater Master Plan.", url: "https://www.naplesgov.com/" },
      { text: "NOAA Tides and Currents, Naples Bay (Station 8725110).", url: "https://tidesandcurrents.noaa.gov/stationhome.html?id=8725110" },
      { text: "Collier County Coastal Resilience Plan.", url: "https://www.colliercountyfl.gov/government/operations/resiliency-and-sustainability" }
    ]
  }
];
