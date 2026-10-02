"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  MapPin, Calendar, User, Eye, MessageSquare, ChevronDown, ChevronUp, 
  ArrowRight, ShieldCheck, AlertCircle, Clock, CheckCircle2 
} from "lucide-react";

export default function FieldworkPage() {
  // Accordion state for the 5 interview sections
  const [expandedSection, setExpandedSection] = useState<number | null>(0);

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const interviewModules = [
    {
      id: "01",
      title: "Seasonal Disease Patterns & Surge Dynamics",
      qa: [
        {
          q: "What seasonal shifts in patient volume and disease presentation do you observe throughout the calendar year?",
          a: "The Medical Officer explained that patient footfall surges noticeably during two distinct periods. First, with the onset of the monsoon in June and July, acute gastroenteritis and diarrhea cases spike rapidly due to municipal water line contamination and unlined drain overflows. Second, between September and November, fever cases dominate the OPD, with clinically suspected dengue and viral fevers peaking as post-monsoon stagnant pools dry out slowly."
        },
        {
          q: "How does local vector-borne transmission differ from rural or forested districts?",
          a: "The informant emphasized that Palghar district encompasses both tribal/forested regions and dense peri-urban belts like Nallasopara. In Nallasopara, malaria is largely Plasmodium vivax linked to construction stagnation, whereas dengue is driven by domestic and peri-domestic artificial water containers, overhead tanks, and plastic storage drums."
        }
      ]
    },
    {
      id: "02",
      title: "Surveillance, Testing & Reporting Protocols",
      qa: [
        {
          q: "How are suspected outbreak diseases diagnosed and recorded at this facility?",
          a: "The Medical Officer stated that initial diagnosis relies heavily on clinical evaluation and Rapid Diagnostic Test (RDT) kits—primarily malaria antigen cards and Dengue NS1/IgM rapid cassettes. When rapid tests show positive results or when unusual clustering occurs, blood samples are dispatched to the Sub-District or District Reference Laboratory for ELISA confirmation."
        },
        {
          q: "What is the operational reporting workflow from OPD registration to IDSP transmission?",
          a: "Cases are first entered by hand into daily physical OPD registers. At the close of each day, fever and diarrhea counts are tallied onto Form L (laboratory confirmed) or Form P (presumptive). On a weekly schedule (typically Mondays), these tallies are consolidated and submitted electronically to the Palghar District Surveillance Unit (DSU)."
        }
      ]
    },
    {
      id: "03",
      title: "Public-Health Response & Outbreak Containment",
      qa: [
        {
          q: "What immediate containment triggers occur when multiple cases are detected from a specific neighborhood?",
          a: "When 3 or more suspected cases cluster within a single municipal lane or chawl, the Medical Officer alerts the local municipal sanitation team. Field teams are mobilized to inspect domestic water storage, distribute chlorine tablets, conduct thermal fogging for adult mosquitoes, and set up temporary ORS distribution booths."
        },
        {
          q: "What are the primary logistical hurdles during seasonal peak months?",
          a: "Stockouts of rapid test kits during sudden dengue surges and delayed turnaround for confirmatory ELISA results from the reference laboratory are significant operational constraints. Patient self-medication via private retail pharmacies before visiting the government health post also delays early detection."
        }
      ]
    },
    {
      id: "04",
      title: "Foodborne Illness & Enteric Clustering",
      qa: [
        {
          q: "How do food poisoning presentations differ from general acute diarrheal disease?",
          a: "The informant noted that food poisoning typically presents as sudden, explosive cohorts—such as 15 to 40 individuals arriving within hours following a community feast, wedding, or religious event. In contrast, ADD presentations are steady, individual household cases distributed across the entire monsoon season."
        },
        {
          q: "Does ambient summer heat directly influence enteric presentations?",
          a: "Yes. In April and May, high ambient temperatures accelerate bacterial proliferation in street foods, unrefrigerated dairy, and stored drinking water, producing an early pre-monsoon rise in foodborne gastroenteritis."
        }
      ]
    },
    {
      id: "05",
      title: "Data Systems, Reporting Latency & Technology Needs",
      qa: [
        {
          q: "What gaps exist between daily clinical reality and official weekly government reports?",
          a: "The Medical Officer highlighted that official IDSP bulletins aggregate validated outbreak clusters meeting notification thresholds. Individual mild or moderately febrile patients treated and discharged on OPD medications may never appear in an outbreak bulletin unless an official cluster investigation is declared. This creates an inevitable latency and threshold divergence between health post reality and statewide datasets."
        },
        {
          q: "What technological improvements would most benefit facility-level surveillance?",
          a: "Direct digital tablet entry at the OPD triage desk with automated threshold alerting and seamless integration with reference lab results, eliminating duplicate manual paper transcription."
        }
      ]
    }
  ];

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="border-b border-[#D8D1C5] bg-[#FAF7F2] py-16 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 bg-[#174A4A] text-[#F3EFE6] text-xs font-mono font-semibold uppercase rounded">
              Primary Qualitative Field Evidence
            </span>
            <span className="px-2.5 py-1 bg-[#E8E2D7] text-[#171A18] text-xs font-mono font-medium rounded border border-[#D8D1C5]">
              One Facility · One Key Informant · One Visit
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#171A18]">
            From Data to the Ground
          </h1>

          <p className="text-base sm:text-lg text-[#565C58] leading-relaxed">
            A structured qualitative investigation placing statewide epidemiological surveillance data alongside the operational reality of an urban government health facility in Palghar district.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-mono text-[#565C58]">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#174A4A]" />
              <span>02 October 2026</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C84B2F]" />
              <span>Nallasopara West, Palghar, Maharashtra</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#174A4A]" />
              <span>Medical Officer In-Charge</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VISIT SNAPSHOT */}
      <section className="border-b border-[#D8D1C5] bg-[#E8E2D7] py-10 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-[#174A4A] font-semibold">
            Site Context & Facility Profile
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#171A18]">
            Urban Health Post · Nallasopara West
          </h2>
          <p className="text-xs sm:text-sm text-[#565C58] leading-relaxed">
            The facility is a municipal government health post serving a densely populated peri-urban catchment characterized by mixed informal settlements (chawls) and multi-story tenement buildings. The facility operates daily outpatient (OPD) clinics, maternal and child immunization programs, basic diagnostic rapid testing, and coordinates community health outreach.
          </p>
        </div>
      </section>

      {/* 3. WHAT I OBSERVED vs WHAT THE MEDICAL OFFICER REPORTED */}
      <section className="py-14 px-4 lg:px-8 max-w-5xl mx-auto space-y-12">
        <div className="space-y-2 border-b border-[#D8D1C5] pb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[#174A4A] font-semibold">
            Field Evidence Documentation
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#171A18]">
            Direct Observations & Key-Informant Testimony
          </h2>
          <p className="text-xs text-[#565C58]">
            To ensure methodological rigor, observational findings are strictly differentiated from reported interview data.
          </p>
        </div>

        {/* Observation Block */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-[#FAF7F2] border border-[#D8D1C5] text-xs font-mono font-bold text-[#174A4A] rounded">
              DIRECT OBSERVATION
            </span>
            <span className="text-xs font-mono text-[#7A827D]">Researcher Field Notes · 02 Oct 2026</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#FAF7F2] border border-[#D8D1C5] p-5 rounded space-y-2">
              <div className="font-mono text-xs text-[#C84B2F] font-bold">FIELD NOTE 01 · 10:40 AM</div>
              <h4 className="font-serif text-base font-bold text-[#171A18]">OPD Triage & Patient Footfall</h4>
              <p className="text-xs text-[#565C58] leading-relaxed">
                High morning patient activity in the waiting corridor. Triage is handled manually by nursing staff. Approximately 60% of attending patients presented with acute febrile illness or gastrointestinal complaints.
              </p>
            </div>

            <div className="bg-[#FAF7F2] border border-[#D8D1C5] p-5 rounded space-y-2">
              <div className="font-mono text-xs text-[#C84B2F] font-bold">FIELD NOTE 02 · 11:15 AM</div>
              <h4 className="font-serif text-base font-bold text-[#171A18]">Diagnostic Point-of-Care</h4>
              <p className="text-xs text-[#565C58] leading-relaxed">
                Dedicated Oral Rehydration corner fully accessible with packets pre-mixed in clean dispensers. Rapid diagnostic test (RDT) cards for Malaria (Pf/Pv) and Dengue (NS1) were present in stock and actively utilized by the laboratory technician.
              </p>
            </div>

            <div className="bg-[#FAF7F2] border border-[#D8D1C5] p-5 rounded space-y-2">
              <div className="font-mono text-xs text-[#C84B2F] font-bold">FIELD NOTE 03 · 12:00 PM</div>
              <h4 className="font-serif text-base font-bold text-[#171A18]">Perimeter Environmental Survey</h4>
              <p className="text-xs text-[#565C58] leading-relaxed">
                Inspection of the facility lane revealed unlined roadside drainage ditches with intermittent water stagnation. Nearby residential chawls exhibited heavy reliance on 200-liter blue plastic drums for domestic water storage due to scheduled municipal supply intervals.
              </p>
            </div>
          </div>
        </div>

        {/* Informant Report Block */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-[#FAF7F2] border border-[#D8D1C5] text-xs font-mono font-bold text-[#C84B2F] rounded">
              INFORMANT REPORT
            </span>
            <span className="text-xs font-mono text-[#7A827D]">Key-Informant Testimony · Medical Officer In-Charge</span>
          </div>

          <div className="bg-[#FAF7F2] border border-[#D8D1C5] p-6 rounded space-y-3">
            <p className="text-xs sm:text-sm text-[#171A18] leading-relaxed">
              &ldquo;The Medical Officer reported that while monsoon rains in June–August bring predictable diarrheal illness, it is the <strong>post-monsoon stretch from September through November</strong> that strains outpatient capacity with fever. Because municipal piped water is only supplied for 1 to 2 hours every alternate day in parts of Nallasopara West, residents must store water in domestic containers. When residents fail to tightly cover these drums, they turn into ideal breeding grounds for <em>Aedes</em> mosquitoes within 7 to 10 days.&rdquo;
            </p>
            <div className="text-xs font-mono text-[#7A827D] pt-1">
              Source: Semi-structured interview conducted at facility · 02 Oct 2026
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE KEY COMPARISON: STATEWIDE DATA vs LOCAL FACILITY REPORT */}
      <section className="bg-[#FAF7F2] border-y border-[#D8D1C5] py-14 px-4 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="space-y-2 border-b border-[#D8D1C5] pb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#C84B2F] font-semibold">
              Core Methodological Synthesis
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#171A18]">
              What the Statewide Data Shows vs. What the Local Facility Reported
            </h2>
            <p className="text-xs sm:text-sm text-[#565C58] leading-relaxed">
              Comparing aggregated macro-surveillance metrics with micro-level health post reality reveals critical operational nuances:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dengue Comparison */}
            <div className="bg-[#F3EFE6] border border-[#D8D1C5] p-5 rounded space-y-3">
              <div className="font-serif text-lg font-bold text-[#171A18]">Dengue Dynamics</div>
              <div className="space-y-2 text-xs">
                <div className="bg-[#FAF7F2] p-2.5 rounded border border-[#D8D1C5]">
                  <span className="font-mono font-bold text-[#174A4A]">Statewide IDSP Layer:</span>
                  <p className="text-[#565C58] mt-0.5">82.8% of events occur in Jun–Oct, with peak concentration cresting statewide in October (CR3 = 0.505).</p>
                </div>
                <div className="bg-[#FAF7F2] p-2.5 rounded border border-[#D8D1C5]">
                  <span className="font-mono font-bold text-[#C84B2F]">Local Health Post Report:</span>
                  <p className="text-[#565C58] mt-0.5">Clinical presentations surge heavily between September and November, driven by domestic drum storage during post-monsoon dry intervals.</p>
                </div>
              </div>
            </div>

            {/* Malaria Comparison */}
            <div className="bg-[#F3EFE6] border border-[#D8D1C5] p-5 rounded space-y-3">
              <div className="font-serif text-lg font-bold text-[#171A18]">Malaria Dynamics</div>
              <div className="space-y-2 text-xs">
                <div className="bg-[#FAF7F2] p-2.5 rounded border border-[#D8D1C5]">
                  <span className="font-mono font-bold text-[#174A4A]">Statewide IDSP Layer:</span>
                  <p className="text-[#565C58] mt-0.5">May–July captures 54.3% of outbreak events statewide, with heavy clustering in eastern tribal forest belts (e.g. Gadchiroli).</p>
                </div>
                <div className="bg-[#FAF7F2] p-2.5 rounded border border-[#D8D1C5]">
                  <span className="font-mono font-bold text-[#C84B2F]">Local Health Post Report:</span>
                  <p className="text-[#565C58] mt-0.5">Cases peak in July–September, strictly dominated by P. vivax linked to construction-site puddles rather than rural forested streams.</p>
                </div>
              </div>
            </div>

            {/* ADD Comparison */}
            <div className="bg-[#F3EFE6] border border-[#D8D1C5] p-5 rounded space-y-3">
              <div className="font-serif text-lg font-bold text-[#171A18]">Acute Diarrheal Disease (ADD)</div>
              <div className="space-y-2 text-xs">
                <div className="bg-[#FAF7F2] p-2.5 rounded border border-[#D8D1C5]">
                  <span className="font-mono font-bold text-[#174A4A]">Statewide IDSP Layer:</span>
                  <p className="text-[#565C58] mt-0.5">June–August (43.1% CR3) followed by a secondary October elevation. Statistically confirmed concordance (W=0.530, p=0.016).</p>
                </div>
                <div className="bg-[#FAF7F2] p-2.5 rounded border border-[#D8D1C5]">
                  <span className="font-mono font-bold text-[#C84B2F]">Local Health Post Report:</span>
                  <p className="text-[#565C58] mt-0.5">Immediate surge upon the first heavy monsoon downpour as aged municipal distribution lines suffer sewage cross-ingress.</p>
                </div>
              </div>
            </div>

            {/* Chikungunya Comparison */}
            <div className="bg-[#F3EFE6] border border-[#D8D1C5] p-5 rounded space-y-3">
              <div className="font-serif text-lg font-bold text-[#171A18]">Chikungunya Dynamics</div>
              <div className="space-y-2 text-xs">
                <div className="bg-[#FAF7F2] p-2.5 rounded border border-[#D8D1C5]">
                  <span className="font-mono font-bold text-[#174A4A]">Statewide IDSP Layer:</span>
                  <p className="text-[#565C58] mt-0.5">No stable recurring monthly pattern across baseline years (W = 0.220, p = 0.450). Sporadic multi-year surges.</p>
                </div>
                <div className="bg-[#FAF7F2] p-2.5 rounded border border-[#D8D1C5]">
                  <span className="font-mono font-bold text-[#C84B2F]">Local Health Post Report:</span>
                  <p className="text-[#565C58] mt-0.5">Sporadic, highly localized household clusters; patients frequently present with severe polyarthralgia outlasting the acute febrile phase.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Synthesis Statement */}
          <div className="p-5 bg-[#E8E2D7] border border-[#D8D1C5] rounded space-y-2">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#171A18] font-bold">
              The Crucial Analytical Distinction
            </h4>
            <p className="text-xs sm:text-sm text-[#565C58] leading-relaxed">
              &ldquo;The two layers describe different things. The NCDC/IDSP dataset summarizes reported surveillance events across Maharashtra, while the interview represents one facility-level perspective in Nallasopara West.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* 5. LOCAL SURVEILLANCE PATHWAY */}
      <section className="py-14 px-4 lg:px-8 max-w-5xl mx-auto space-y-6">
        <div className="space-y-2 border-b border-[#D8D1C5] pb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[#174A4A] font-semibold">
            Institutional Information Flow
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#171A18]">
            Local Surveillance Pathway
          </h2>
          <p className="text-xs text-[#565C58]">
            Step-by-step lifecycle of disease documentation from patient registration to weekly government compilation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-[#FAF7F2] border border-[#D8D1C5] p-4 rounded space-y-2">
            <div className="font-mono font-bold text-[#174A4A]">01 · OPD REGISTRATION</div>
            <p className="text-[#565C58] leading-relaxed">
              Patient presents with fever or diarrhea. Clinical symptoms recorded in daily physical OPD registry.
            </p>
          </div>

          <div className="bg-[#FAF7F2] border border-[#D8D1C5] p-4 rounded space-y-2">
            <div className="font-mono font-bold text-[#174A4A]">02 · RAPID TRIAGE</div>
            <p className="text-[#565C58] leading-relaxed">
              Immediate blood smear / RDT card administered for malaria or dengue. ORS distributed for dehydration.
            </p>
          </div>

          <div className="bg-[#FAF7F2] border border-[#D8D1C5] p-4 rounded space-y-2">
            <div className="font-mono font-bold text-[#174A4A]">03 · DAILY TALLY (FORM L/P)</div>
            <p className="text-[#565C58] leading-relaxed">
              Positive rapid tests logged into Form L (lab-confirmed); symptomatic febrile cases logged into Form P (presumptive).
            </p>
          </div>

          <div className="bg-[#FAF7F2] border border-[#D8D1C5] p-4 rounded space-y-2">
            <div className="font-mono font-bold text-[#C84B2F]">04 · IDSP UPLOAD</div>
            <p className="text-[#565C58] leading-relaxed">
              Weekly consolidation submitted every Monday to Palghar District Surveillance Unit (DSU) and state portal.
            </p>
          </div>
        </div>
      </section>

      {/* 6. KEY-INFORMANT INTERVIEW (ONE EXPANDABLE SECTION, 5 MODULES) */}
      <section className="bg-[#FAF7F2] border-t border-[#D8D1C5] py-16 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2 border-b border-[#D8D1C5] pb-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-[#E8E2D7] text-[11px] font-mono uppercase text-[#174A4A] font-semibold rounded">
                Interview Guide Codification
              </span>
              <span className="text-xs font-mono text-[#7A827D]">02 Oct 2026 · Nallasopara West</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#171A18]">
              Key-Informant Interview: Medical Officer In-Charge
            </h2>
            <p className="text-xs sm:text-sm text-[#565C58] leading-relaxed">
              Paraphrased responses organized across five core operational modules. Click any module header to expand or collapse.
            </p>
          </div>

          {/* 5 Accordion Modules */}
          <div className="space-y-3">
            {interviewModules.map((mod, index) => {
              const isExpanded = expandedSection === index;
              return (
                <div key={mod.id} className="border border-[#D8D1C5] rounded bg-[#F3EFE6] overflow-hidden">
                  <button
                    onClick={() => toggleSection(index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-[#E8E2D7] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#174A4A] bg-[#FAF7F2] px-2 py-1 rounded border border-[#D8D1C5]">
                        {mod.id}
                      </span>
                      <span className="font-serif text-base sm:text-lg font-bold text-[#171A18]">
                        {mod.title}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-[#174A4A]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#565C58]" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="p-5 pt-2 border-t border-[#D8D1C5] bg-[#FAF7F2] space-y-5">
                      {mod.qa.map((item, qIdx) => (
                        <div key={qIdx} className="space-y-2 border-b border-[#D8D1C5]/60 last:border-0 pb-4 last:pb-0">
                          <div className="font-mono text-xs font-semibold text-[#174A4A]">
                            Q{qIdx + 1}: {item.q}
                          </div>
                          <p className="text-xs sm:text-sm text-[#565C58] leading-relaxed pl-2 border-l-2 border-[#174A4A]">
                            {item.a}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. ETHICS, CONSENT & FIELDWORK BOUNDARIES */}
      <section className="bg-[#E8E2D7] border-t border-[#D8D1C5] py-12 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#174A4A] font-bold">
            <ShieldCheck className="w-4 h-4 text-[#AEBB55]" />
            <span>Fieldwork Ethics, Informed Consent & Limitations</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#565C58] leading-relaxed">
            <div className="bg-[#FAF7F2] p-4 rounded border border-[#D8D1C5] space-y-1.5">
              <div className="font-mono font-bold text-[#171A18]">Informed Consent & Anonymity</div>
              <p>
                Prior verbal and institutional consent was obtained from the Medical Officer In-Charge for academic research purposes. No identifiable patient names, case sheets, or personal health records were inspected, transcribed, or stored.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded border border-[#D8D1C5] space-y-1.5">
              <div className="font-mono font-bold text-[#171A18]">Explicit Analytical Boundaries</div>
              <p>
                Fieldwork observations reflect <strong>one specific facility visit on 02 October 2026</strong>. These observations provide qualitative context for understanding surveillance mechanics; they are not statistically representative ground truth for Maharashtra as a whole.
              </p>
            </div>
          </div>

          <div className="pt-4 flex justify-between items-center text-xs">
            <Link href="/seasonality" className="text-[#174A4A] hover:underline font-semibold">
              ← Back to Seasonality
            </Link>
            <Link href="/method" className="inline-flex items-center gap-1.5 text-[#C84B2F] hover:underline font-semibold">
              <span>Read Methodology & Boundaries</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
