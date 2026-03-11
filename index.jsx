import { useState, useRef, useEffect, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// SYSTEM PROMPT — encodes all 10 skill engine methodologies
// ═══════════════════════════════════════════════════════════════
const SYSTEM_PROMPT = `You are a multi-engine legal analysis reactor operating TEN fused analytical systems for Victorian criminal defence. You produce counsel-grade output for a self-represented accused in Victoria, Australia. Every claim must be grounded in evidence, statute, or authority. Never deflect with "consult a lawyer."

═══════ ENGINE 1: ARTIFICIAL ANALYSIS (GDPval-AA) ═══════
Seven analytical modes — apply minimum needed:
• CAUSAL: trace_backward/forward, isolate_root, test_counterfactual, assess_sufficiency
• COMPARATIVE: align_dimensions, evaluate_per_criterion, weight_criteria, sensitivity_test
• GAP: map_required vs map_actual, classify_gap (missing|incomplete|non-conforming), project_consequence, derive_remediation
• RISK: identify_threats, assess_likelihood × impact, calculate_severity, identify_cascades, assess_residual after mitigation
• STRUCTURAL: decompose, map_dependencies, identify_bottlenecks, assess_coupling, assess_resilience
• TEMPORAL: extract_timeline, identify_trend, identify_inflections, diagnose_inflection, project_forward
• ADVERSARIAL: steelman_opposition, identify_vulnerabilities, simulate_attack, assess_exposure, derive_hardening, red_team

Mode composition: → (sequential), ‖ (parallel), ? (conditional), ↻ (iterative)
Common: Defence Hardening = Adversarial → Gap → Risk | Root Cause = Structural → Causal → Gap

═══════ ENGINE 2: VICTORIAN COMMON LAW ENGINE ═══════
Three components:
A) Discovery: AustLII, Jade.io, JCV, HCA search. Provision-specific → principle-based → broad concept queries.
B) Assessment: Authority Cards with citation, court, hierarchy, ratio decidendi, obiter dicta, application to facts, distinguishability, treatment history (affirmed/applied/distinguished/doubted/overruled), currency status, confidence calibration (ratio accuracy %, currency %, factual application %).
C) Integration: Statute + judicial interpretation → integrated legal position. Conflict resolution: hierarchy > later-in-time > full bench > distinguish.

═══════ ENGINE 3: GDPval-AA / BIGLAW BENCH v3.0 ═══════
Module 1: Elements & Exclusionary Analysis — charge decomposition, s.138 Evidence Act sequential analysis with all s.138(3) factors, Charter overlay, exclusion cascade matrix
Module 2: Argument Construction — proposition → authority → factual foundation → reasoning chain → prosecution counter → rebuttal → strength rating
Module 3: Negotiation & Plea — leverage assessment, diversion eligibility (CJDP s.59, adjourned undertaking s.75), timing, fallback
Module 4: Hearing Preparation — oral submission scripts, cross-examination sequences (closed questions, trap progression, evasion handling), objection quick-draw
Module 5: Document Processing — transcript review, contradiction mapping, disclosure audit (s.50-51 CPA)
Module 6: Procedural Compliance — police procedure vs statutory/VPM requirements, device compliance
Module 7: BWC Forensic Review — timestamp analysis, gap detection, audio-visual sync, officer statement consistency
Module 8: Case Operations — deadlines, exhibits, compliance tracking, cost quantification, multi-matter coordination

═══════ ENGINE 4: VICTORIAN LEGISLATION ENGINE ═══════
Live statutory retrieval with 17 bundled Acts/Regulations. Reasoning modes:
• Provision Interpretation: plain meaning → context → purpose → extrinsic materials → Charter s.32(1) overlay
• Application to Facts: provision elements → fact mapping → conclusion
• Cross-Referencing: interaction type → conflict resolution (express override > specific/general > later-in-time)
• Procedural Mechanics: sequence extraction → time limits → consequence of non-compliance
Key Acts: RSA 1986, Evidence Act 2008, CPA 2009, Crimes Act 1958, Sentencing Act 1991, Charter 2006, Interpretation Act 1984
Always cross-reference regulations (Road Safety General Regs 2019 Regs 15-18 for POFT/drug testing procedures).

═══════ ENGINE 5: LEGAL FORENSIC ANALYZER ═══════
Systematic audit framework:
• Pre-intercept: reasonable suspicion documentation, officer identification, recording timing
• Intercept execution: statutory warnings (verbatim compliance), rights communication, consent vs direction
• Evidence collection: chain of custody, calibration certificates, sample handling, contamination controls
• BWC forensic: timestamp/observation/statutory-ref/defect-classification table, gap analysis, sync anomalies
• s.138 exclusion pathway: threshold → probative value → s.138(3) balancing → determination
• Defence taxonomy: Substantive (identity/actus reus/mens rea) | Procedural (jurisdiction/statutory non-compliance/limitation) | Evidentiary (s.138/reliability/authentication)

═══════ ENGINE 6: LITIGATION DOCUMENT PROCESSOR ═══════
Module 1: Transcript Analysis — structured extraction, admission/concession register, contradiction detection, judicial signal tracking
Module 2: Disclosure Bundle Review — completeness audit (s.50-51 CPA), document triage (Critical/Relevant/Marginal/Irrelevant), multi-document consistency check
Module 3: Cross-Reference Tracking — legislative cross-reference map, defined term register, evidence chain mapping
Module 4: Witness Statement Processing — decomposition (assertions, gaps, credibility, cross-exam targets), multi-witness comparison
Output: every finding with source reference, classification, materiality, action recommendation

═══════ ENGINE 7: CASE OPERATIONS MANAGER ═══════
Module 1: Deadline Tracking — statutory deadlines with trigger/computation/consequence, case register
Module 2: Exhibit Management — prosecution/defence exhibit inventory, hearing bundle compilation (9-tab standard order)
Module 3: Deliverables — format-matched outputs (docx for submissions, xlsx for matrices, pdf for filing, html for diagrams)
Module 4: Compliance Tracking — order compliance register, breach risk assessment
Module 5: Multi-Matter Coordination — dashboard, sequencing notes, interdependency mapping, consolidation assessment

═══════ ENGINE 8: SKILL FUSION REACTOR ═══════
Pipeline orchestration. Pre-built patterns:
• Legal Defence Pipeline: doc-processor → forensic-analyzer → biglaw-engine → case-ops
• Governance Challenge: governance-engine → forensic-analyzer → biglaw-engine → case-ops
• Evidence-to-Argument: doc-processor → glossary → forensic-analyzer → independent-biglaw → full-biglaw
• Prosecution Weakness: gap-analysis → structural-analysis → doc-processor → forensic-analyzer
Execute as DAG with typed fusion points. Validate interfaces at every handoff.

═══════ ENGINE 9: LEGAL IR INTERFACE ═══════
Middleware layer. Transform analyzer findings into typed intermediate representation:
• Emit: classify (statutory/procedural/evidentiary/factual/inferential), source, assert, calibrate (established/arguable/speculative), link, assign ID
• Validate: schema check, referential integrity, orphan detection
• Enrich: argument_strength (0.0-1.0), chain_depth, vulnerability vectors, biglaw_module routing, argument clustering
• Handoff: route enriched IR to correct BigLaw module based on premise category

═══════ ENGINE 10: PUBLIC AUTHORITY GOVERNANCE INTEGRITY ═══════
9-layer recursive analysis:
L1: Authority Source Identification | L2: Delegation Chain Tracing | L3: Procedural Compliance | L4: Substantive Standards | L5: Policy Alignment | L6: Administrative Fairness | L7: Available Remedies | L8: Evidence Sufficiency | L9: Defect Nexus Analysis (recursive reprocessing until stable, max 3 passes)
Use for: challenging police/prosecution authority, testing governance of drug testing programs, auditing compliance frameworks.

═══════ CROSS-ENGINE RULES ═══════
1. Where AA identifies a gap → BigLaw fills it with argument construction
2. Where BigLaw constructs argument → Common Law supplies binding authority
3. Where Legislation Engine interprets statute → Common Law verifies judicial interpretation
4. Where Forensic Analyzer finds defects → IR Interface structures into typed premises → BigLaw builds exclusion argument
5. Where Doc Processor finds contradictions → BigLaw builds cross-examination sequences
6. Where Case Ops identifies deadlines → flag approaching deadlines regardless of query
7. Where Governance Engine finds authority defects → BigLaw constructs challenge
8. Confidence-calibrate EVERY position (High/Medium/Low with basis)
9. Adversarial stress-test final position even if not explicitly selected
10. Conclude with NEXT ACTIONS — specific, sequenced, with deadlines`;

// ═══════════════════════════════════════════════════════════════
// ENGINE DEFINITIONS
// ═══════════════════════════════════════════════════════════════
const ENGINES = {
  aa: {
    name: "Artificial Analysis",
    short: "AA",
    color: "#c8a45a",
    icon: "◈",
    desc: "Seven analytical reasoning modes",
    modules: [
      { id: "adversarial", label: "Adversarial", icon: "⚔", desc: "Steelman opposition, vulnerability scan, attack simulation" },
      { id: "risk", label: "Risk", icon: "⚠", desc: "Threats × likelihood × impact, cascade chains" },
      { id: "gap", label: "Gap", icon: "◇", desc: "Required vs actual state, remediation paths" },
      { id: "causal", label: "Causal", icon: "⟿", desc: "Root cause, counterfactual testing" },
      { id: "structural", label: "Structural", icon: "▣", desc: "Dependencies, bottlenecks, coupling" },
      { id: "temporal", label: "Temporal", icon: "⧖", desc: "Timeline, inflections, trajectory" },
      { id: "comparative", label: "Comparative", icon: "⇋", desc: "Options under constraints, sensitivity" },
    ],
  },
  commonlaw: {
    name: "Common Law Engine",
    short: "CL",
    color: "#7a9ec2",
    icon: "⚖",
    desc: "Case law discovery, assessment, integration",
    modules: [
      { id: "cl_discovery", label: "Discovery", desc: "Find authority via AustLII, Jade.io, JCV, HCA" },
      { id: "cl_assessment", label: "Assessment", desc: "Authority Cards: ratio, treatment, confidence" },
      { id: "cl_integration", label: "Integration", desc: "Statute + case law → integrated position" },
      { id: "cl_distinguish", label: "Distinguish", desc: "Distinguish opponent's authority" },
      { id: "cl_currency", label: "Currency", desc: "Verify case still good law" },
    ],
  },
  biglaw: {
    name: "BigLaw Bench v3.0",
    short: "BL",
    color: "#9a6ab0",
    icon: "⬡",
    desc: "Counsel-grade argument construction & strategy",
    modules: [
      { id: "bl_exclusion", label: "s.138 Exclusion", desc: "Elements + exclusionary analysis" },
      { id: "bl_argument", label: "Argument Build", desc: "Structured argument with authority" },
      { id: "bl_negotiation", label: "Negotiation", desc: "Plea strategy, diversion, leverage" },
      { id: "bl_hearing", label: "Hearing Prep", desc: "Oral scripts, cross-exam, objections" },
      { id: "bl_document", label: "Doc Processing", desc: "Transcript/disclosure/contradiction" },
      { id: "bl_procedural", label: "Procedural Audit", desc: "Police procedure compliance" },
      { id: "bl_bwc", label: "BWC Review", desc: "Body-worn camera forensics" },
      { id: "bl_operations", label: "Case Ops", desc: "Deadlines, exhibits, costs" },
    ],
  },
  legislation: {
    name: "Legislation Engine",
    short: "LE",
    color: "#5ab08a",
    icon: "§",
    desc: "Live statutory retrieval & interpretation",
    modules: [
      { id: "le_interpret", label: "Interpretation", desc: "Plain meaning → context → purpose → Charter" },
      { id: "le_apply", label: "Apply to Facts", desc: "Elements → fact mapping → conclusion" },
      { id: "le_crossref", label: "Cross-Reference", desc: "Inter-provision interaction & conflict" },
      { id: "le_procedure", label: "Procedural Mech.", desc: "Steps, time limits, consequences" },
    ],
  },
  forensic: {
    name: "Legal Forensic Analyzer",
    short: "FA",
    color: "#c27a5a",
    icon: "🔬",
    desc: "Procedural compliance & evidence chain audit",
    modules: [
      { id: "fa_preintercept", label: "Pre-Intercept", desc: "Suspicion, identification, recording" },
      { id: "fa_execution", label: "Intercept Exec", desc: "Warnings, rights, consent/direction" },
      { id: "fa_collection", label: "Evidence Collect", desc: "Chain of custody, calibration, handling" },
      { id: "fa_bwc", label: "BWC Forensic", desc: "Timestamps, gaps, sync anomalies" },
      { id: "fa_exclusion", label: "s.138 Pathway", desc: "Threshold → balancing → determination" },
    ],
  },
  docprocessor: {
    name: "Document Processor",
    short: "DP",
    color: "#b0a05a",
    icon: "📄",
    desc: "Transcripts, disclosure, contradiction mapping",
    modules: [
      { id: "dp_transcript", label: "Transcript", desc: "Extraction, admissions, judicial signals" },
      { id: "dp_disclosure", label: "Disclosure Audit", desc: "Completeness vs s.50-51 CPA" },
      { id: "dp_crossref", label: "Cross-Reference", desc: "Legislative refs, defined terms, evidence chains" },
      { id: "dp_witness", label: "Witness Statements", desc: "Decomposition, multi-witness comparison" },
    ],
  },
  caseops: {
    name: "Case Operations",
    short: "CO",
    color: "#6ab0a0",
    icon: "📋",
    desc: "Deadlines, exhibits, compliance, multi-matter",
    modules: [
      { id: "co_deadlines", label: "Deadlines", desc: "Statutory calculation, interlocutory sequencing" },
      { id: "co_exhibits", label: "Exhibits", desc: "Inventory, hearing bundle (9-tab)" },
      { id: "co_compliance", label: "Compliance", desc: "Order register, breach risk" },
      { id: "co_costs", label: "Cost Quant.", desc: "Financial exposure, fine ranges" },
      { id: "co_multimatter", label: "Multi-Matter", desc: "Coordination, sequencing, interdependency" },
    ],
  },
  fusion: {
    name: "Fusion Reactor",
    short: "FR",
    color: "#b05a7a",
    icon: "⚛",
    desc: "Pipeline orchestration & typed composition",
    modules: [
      { id: "fr_pipeline", label: "Pipeline Build", desc: "DAG construction with typed edges" },
      { id: "fr_validate", label: "Interface Validate", desc: "Type check at fusion points" },
      { id: "fr_gaps", label: "Gap Detection", desc: "Missing skills, weak interfaces" },
    ],
  },
  irinterface: {
    name: "Legal IR Interface",
    short: "IR",
    color: "#7ab06a",
    icon: "⇄",
    desc: "Typed middleware: analyzer → biglaw handoff",
    modules: [
      { id: "ir_emit", label: "Emit IR", desc: "Findings → typed LegalPremise objects" },
      { id: "ir_validate", label: "Validate Schema", desc: "Referential integrity, orphan detection" },
      { id: "ir_enrich", label: "Enrich", desc: "Strength scores, clustering, module routing" },
    ],
  },
  governance: {
    name: "Governance Integrity",
    short: "GI",
    color: "#a06ab0",
    icon: "🏛",
    desc: "Public authority power & compliance audit",
    modules: [
      { id: "gi_authority", label: "Authority Source", desc: "Trace power to enabling statute" },
      { id: "gi_delegation", label: "Delegation Chain", desc: "Instrument validity, conditions" },
      { id: "gi_compliance", label: "Proc. Compliance", desc: "Mandatory steps, notice, reasons" },
      { id: "gi_fairness", label: "Admin Fairness", desc: "Hearing rule, bias, proportionality" },
      { id: "gi_remedies", label: "Remedies", desc: "JR, VCAT, complaints, damages" },
      { id: "gi_nexus", label: "Defect Nexus", desc: "Recursive reprocessing (L9)" },
    ],
  },
};

const PRESETS = [
  {
    label: "Full Defence Audit",
    desc: "Complete case analysis across all engines",
    engines: {
      aa: ["adversarial", "risk", "gap", "structural"],
      biglaw: ["bl_exclusion", "bl_argument", "bl_procedural"],
      commonlaw: ["cl_discovery", "cl_assessment", "cl_integration"],
      legislation: ["le_interpret", "le_crossref"],
      forensic: ["fa_execution", "fa_collection", "fa_exclusion"],
      docprocessor: [], caseops: ["co_deadlines"], fusion: [], irinterface: ["ir_enrich"], governance: [],
    },
  },
  {
    label: "Hearing Prep Pipeline",
    desc: "Full pipeline: evidence → analysis → arguments → bundle",
    engines: {
      aa: ["adversarial"],
      biglaw: ["bl_hearing", "bl_argument", "bl_exclusion"],
      commonlaw: ["cl_discovery", "cl_assessment", "cl_distinguish"],
      legislation: ["le_interpret"],
      forensic: ["fa_execution", "fa_bwc"],
      docprocessor: ["dp_transcript"],
      caseops: ["co_exhibits", "co_deadlines"],
      fusion: ["fr_pipeline"], irinterface: ["ir_emit", "ir_enrich"], governance: [],
    },
  },
  {
    label: "s.138 Exclusion Build",
    desc: "Evidence exclusion from procedural defects",
    engines: {
      aa: ["causal", "risk", "adversarial"],
      biglaw: ["bl_exclusion", "bl_argument", "bl_procedural", "bl_bwc"],
      commonlaw: ["cl_discovery", "cl_integration"],
      legislation: ["le_interpret", "le_crossref"],
      forensic: ["fa_execution", "fa_collection", "fa_bwc", "fa_exclusion"],
      docprocessor: [], caseops: [], fusion: [], irinterface: ["ir_emit", "ir_validate", "ir_enrich"], governance: [],
    },
  },
  {
    label: "Prosecution Weakness Scan",
    desc: "Systematic identification of prosecution case gaps",
    engines: {
      aa: ["gap", "adversarial", "structural"],
      biglaw: ["bl_exclusion", "bl_document", "bl_procedural"],
      commonlaw: ["cl_assessment"],
      legislation: ["le_interpret", "le_apply"],
      forensic: ["fa_execution", "fa_collection"],
      docprocessor: ["dp_disclosure", "dp_witness"],
      caseops: [], fusion: [], irinterface: [], governance: [],
    },
  },
  {
    label: "Governance Challenge",
    desc: "Challenge public authority power/procedure",
    engines: {
      aa: ["structural", "gap", "adversarial"],
      biglaw: ["bl_argument"],
      commonlaw: ["cl_discovery", "cl_integration"],
      legislation: ["le_interpret", "le_crossref", "le_procedure"],
      forensic: [],
      docprocessor: [],
      caseops: ["co_deadlines"],
      fusion: ["fr_pipeline"],
      irinterface: ["ir_enrich"],
      governance: ["gi_authority", "gi_delegation", "gi_compliance", "gi_fairness", "gi_remedies", "gi_nexus"],
    },
  },
  {
    label: "Strategic Risk Map",
    desc: "Full risk landscape with mitigation strategy",
    engines: {
      aa: ["risk", "adversarial", "temporal", "comparative"],
      biglaw: ["bl_negotiation", "bl_argument"],
      commonlaw: ["cl_integration"],
      legislation: ["le_apply"],
      forensic: [],
      docprocessor: [],
      caseops: ["co_costs", "co_multimatter"],
      fusion: [], irinterface: [], governance: [],
    },
  },
  {
    label: "Evidence-to-Argument Pipeline",
    desc: "Raw documents → structured findings → court-ready arguments",
    engines: {
      aa: ["adversarial", "gap"],
      biglaw: ["bl_argument", "bl_hearing"],
      commonlaw: ["cl_discovery", "cl_assessment"],
      legislation: ["le_interpret"],
      forensic: ["fa_execution", "fa_collection"],
      docprocessor: ["dp_transcript", "dp_disclosure", "dp_crossref", "dp_witness"],
      caseops: ["co_exhibits"],
      fusion: ["fr_pipeline", "fr_validate"],
      irinterface: ["ir_emit", "ir_validate", "ir_enrich"],
      governance: [],
    },
  },
  {
    label: "Cross-Examination Builder",
    desc: "Build cross-exam sequences from contradictions",
    engines: {
      aa: ["adversarial"],
      biglaw: ["bl_hearing", "bl_document"],
      commonlaw: [],
      legislation: [],
      forensic: ["fa_bwc"],
      docprocessor: ["dp_transcript", "dp_witness"],
      caseops: [],
      fusion: [], irinterface: [], governance: [],
    },
  },
];

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

function Chip({ label, icon, active, color, onClick, small }) {
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      padding: small ? "3px 8px" : "5px 12px",
      borderRadius: "3px",
      border: `1px solid ${active ? color || "#c8a45a" : "#2a2a2a"}`,
      background: active ? `${color || "#c8a45a"}15` : "transparent",
      color: active ? (color || "#c8a45a") : "#5a5a5a",
      fontSize: small ? "10px" : "11px",
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: active ? 600 : 400,
      cursor: "pointer",
      transition: "all 0.15s ease",
      letterSpacing: "0.03em",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
    }}>
      {icon && <span style={{ fontSize: small ? "11px" : "12px" }}>{icon}</span>}
      {label}
    </button>
  );
}

function EngineCard({ engineKey, engine, selected, onToggle, collapsed, onToggleCollapse }) {
  const activeCount = selected.length;
  const totalCount = engine.modules.length;
  return (
    <div style={{
      border: `1px solid ${activeCount > 0 ? engine.color + "44" : "#1a1a1a"}`,
      borderRadius: "6px",
      background: activeCount > 0 ? `${engine.color}06` : "#0c0c0c",
      overflow: "hidden",
      transition: "all 0.2s",
    }}>
      <button onClick={onToggleCollapse} style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 12px", border: "none", background: "none", cursor: "pointer",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "16px" }}>{engine.icon}</span>
          <div style={{ textAlign: "left" }}>
            <div style={{
              fontSize: "11px", fontWeight: 700, color: activeCount > 0 ? engine.color : "#6a6a6a",
              fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.05em",
            }}>{engine.short}</div>
            <div style={{ fontSize: "9px", color: "#4a4a4a", fontFamily: "'JetBrains Mono', monospace" }}>
              {engine.name}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {activeCount > 0 && (
            <span style={{
              fontSize: "9px", padding: "2px 6px", borderRadius: "10px",
              background: `${engine.color}22`, color: engine.color,
              fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
            }}>{activeCount}/{totalCount}</span>
          )}
          <span style={{ color: "#3a3a3a", fontSize: "10px", transform: collapsed ? "" : "rotate(90deg)", transition: "transform 0.15s" }}>▶</span>
        </div>
      </button>
      {!collapsed && (
        <div style={{ padding: "0 10px 10px", display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {engine.modules.map((m) => (
            <Chip
              key={m.id}
              label={m.label}
              icon={m.icon}
              active={selected.includes(m.id)}
              color={engine.color}
              onClick={() => onToggle(m.id)}
              small
            />
          ))}
        </div>
      )}
    </div>
  );
}

function PipelineViz({ selections }) {
  const activeEngines = Object.entries(ENGINES)
    .filter(([k]) => selections[k]?.length > 0)
    .map(([k, e]) => ({ key: k, ...e, count: selections[k].length }));

  if (activeEngines.length === 0) return null;

  return (
    <div style={{
      padding: "12px", borderRadius: "6px", border: "1px solid #1a1a1a", background: "#0a0a0a",
      marginBottom: "16px",
    }}>
      <div style={{
        fontSize: "9px", letterSpacing: "0.2em", color: "#4a4a4a", marginBottom: "8px",
        fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", fontWeight: 700,
      }}>ACTIVE PIPELINE</div>
      <div style={{ display: "flex", alignItems: "center", gap: "4px", flexWrap: "wrap" }}>
        {activeEngines.map((e, i) => (
          <div key={e.key} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "4px",
              padding: "4px 10px", borderRadius: "3px",
              border: `1px solid ${e.color}44`, background: `${e.color}0a`,
            }}>
              <span style={{ fontSize: "12px" }}>{e.icon}</span>
              <span style={{
                fontSize: "10px", fontWeight: 700, color: e.color,
                fontFamily: "'JetBrains Mono', monospace",
              }}>{e.short}</span>
              <span style={{
                fontSize: "8px", color: `${e.color}88`, fontFamily: "'JetBrains Mono', monospace",
              }}>×{e.count}</span>
            </div>
            {i < activeEngines.length - 1 && (
              <span style={{ color: "#2a2a2a", fontSize: "10px", fontFamily: "monospace" }}>→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MatterProfile({ profile, setProfile, show, setShow }) {
  if (!show) return (
    <button onClick={() => setShow(true)} style={{
      width: "100%", padding: "8px", border: "1px solid #1a1a1a", borderRadius: "4px",
      background: "#0c0c0c", color: "#4a4a4a", fontSize: "10px", cursor: "pointer",
      fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em", textAlign: "left",
    }}>▸ MATTER PROFILE {profile.charges ? "(set)" : "(empty)"}</button>
  );

  const field = (key, label, placeholder, multi) => (
    <div key={key} style={{ marginBottom: "8px" }}>
      <label style={{
        display: "block", fontSize: "9px", color: "#5a5a5a", marginBottom: "3px",
        fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em", textTransform: "uppercase",
      }}>{label}</label>
      {multi ? (
        <textarea value={profile[key] || ""} onChange={(e) => setProfile(p => ({ ...p, [key]: e.target.value }))}
          placeholder={placeholder}
          style={{
            width: "100%", height: "48px", background: "#0a0a0a", border: "1px solid #2a2a2a",
            borderRadius: "3px", padding: "6px 8px", color: "#a0a0a0", fontSize: "11px",
            fontFamily: "'JetBrains Mono', monospace", resize: "vertical", boxSizing: "border-box",
          }} />
      ) : (
        <input value={profile[key] || ""} onChange={(e) => setProfile(p => ({ ...p, [key]: e.target.value }))}
          placeholder={placeholder}
          style={{
            width: "100%", background: "#0a0a0a", border: "1px solid #2a2a2a",
            borderRadius: "3px", padding: "6px 8px", color: "#a0a0a0", fontSize: "11px",
            fontFamily: "'JetBrains Mono', monospace", boxSizing: "border-box",
          }} />
      )}
    </div>
  );

  return (
    <div style={{
      border: "1px solid #1a1a1a", borderRadius: "6px", background: "#0c0c0c",
      padding: "12px", marginBottom: "12px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <span style={{
          fontSize: "10px", letterSpacing: "0.15em", color: "#c8a45a",
          fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
        }}>MATTER PROFILE</span>
        <button onClick={() => setShow(false)} style={{
          background: "none", border: "none", color: "#3a3a3a", cursor: "pointer", fontSize: "10px",
        }}>▾ COLLAPSE</button>
      </div>
      {field("charges", "Charges", "s.49(1)(bb) RSA 1986; s.18(1) RSA 1986", true)}
      {field("court", "Court / Stage", "Magistrates' Court — Moorabbin — Contest Mention")}
      {field("nextDate", "Next Date", "2026-04-15")}
      {field("stakes", "Stakes", "Fine + licence cancellation (no imprisonment)")}
      {field("disclosureStatus", "Disclosure Status", "Partial — BWC received, SOPs admitted non-existent")}
      {field("defencePosture", "Defence Posture", "Contest — statutory trigger failure + s.138 exclusion")}
      {field("keyEvidence", "Key Evidence / Weaknesses", "POFT negative per manufacturer; 51min BWC redaction...", true)}
    </div>
  );
}

function renderMd(text) {
  let h = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  h = h.replace(/```(\w*)\n([\s\S]*?)```/g, (_, l, c) => `<pre><code>${c.trim()}</code></pre>`);
  h = h.replace(/`([^`]+)`/g, "<code>$1</code>");
  h = h.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  h = h.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  h = h.replace(/^# (.+)$/gm, "<h1>$1</h1>");
  h = h.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  h = h.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  h = h.replace(/\*(.+?)\*/g, "<em>$1</em>");
  h = h.replace(/^&gt; (.+)$/gm, "<blockquote>$1</blockquote>");
  h = h.replace(/^---$/gm, "<hr>");
  h = h.replace(
    /^\|(.+)\|\n\|[-| :]+\|\n((?:\|.+\|\n?)*)/gm,
    (_, header, body) => {
      const ths = header.split("|").map(x => x.trim()).filter(Boolean).map(x => `<th>${x}</th>`).join("");
      const rows = body.trim().split("\n").map(row => {
        const tds = row.split("|").map(c => c.trim()).filter(Boolean).map(c => `<td>${c}</td>`).join("");
        return `<tr>${tds}</tr>`;
      }).join("");
      return `<table><thead><tr>${ths}</tr></thead><tbody>${rows}</tbody></table>`;
    }
  );
  h = h.replace(/^(\d+)\. (.+)$/gm, "<li>$2</li>");
  h = h.replace(/^- (.+)$/gm, "<li>$1</li>");
  h = h.replace(/((?:<li>.*<\/li>\n?)+)/g, "<ul>$1</ul>");
  h = h.replace(/^(?!<[hulotbp]|<\/)(.+)$/gm, (m) => m.trim() ? `<p>${m}</p>` : "");
  return h;
}

// ═══════════════════════════════════════════════════════════════
// MAIN APPLICATION
// ═══════════════════════════════════════════════════════════════

export default function DefenceReactorV2() {
  const initSel = {};
  Object.keys(ENGINES).forEach(k => { initSel[k] = []; });

  const [selections, setSelections] = useState(initSel);
  const [collapsed, setCollapsed] = useState(() => {
    const c = {};
    Object.keys(ENGINES).forEach(k => { c[k] = true; });
    return c;
  });
  const [facts, setFacts] = useState("");
  const [question, setQuestion] = useState("");
  const [matterProfile, setMatterProfile] = useState({});
  const [showMatter, setShowMatter] = useState(false);
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState("idle");
  const [history, setHistory] = useState([]);
  const [followUp, setFollowUp] = useState("");
  const [activePanel, setActivePanel] = useState("config");
  const outputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [response]);

  const toggleModule = (engineKey, moduleId) => {
    setSelections(prev => ({
      ...prev,
      [engineKey]: prev[engineKey].includes(moduleId)
        ? prev[engineKey].filter(x => x !== moduleId)
        : [...prev[engineKey], moduleId],
    }));
  };

  const totalActive = Object.values(selections).reduce((a, b) => a + b.length, 0);

  const applyPreset = (preset) => {
    const next = {};
    Object.keys(ENGINES).forEach(k => { next[k] = preset.engines[k] || []; });
    setSelections(next);
    // Expand engines that have selections
    const c = {};
    Object.keys(ENGINES).forEach(k => { c[k] = !(next[k]?.length > 0); });
    setCollapsed(c);
  };

  const buildPrompt = (input) => {
    const engineList = Object.entries(ENGINES)
      .filter(([k]) => selections[k]?.length > 0)
      .map(([k, e]) => {
        const mods = selections[k].map(id => e.modules.find(m => m.id === id)?.label).filter(Boolean);
        return `• ${e.name}: ${mods.join(", ")}`;
      }).join("\n");

    const matterCtx = Object.values(matterProfile).some(v => v?.trim())
      ? `\nMATTER PROFILE:\n${Object.entries(matterProfile).filter(([_, v]) => v?.trim()).map(([k, v]) => `  ${k}: ${v}`).join("\n")}` : "";

    return `REACTOR INPUT
═════════════${matterCtx}

CASE FACTS:
${facts || "(See matter profile)"}

SPECIFIC QUESTION / TASK:
${input}

ENGINES ACTIVATED:
${engineList || "None selected — use your judgment on which engines apply."}

INSTRUCTIONS:
1. Execute each activated engine against the input
2. Use typed output formats from each engine (Authority Cards, Risk Registers, Argument Structures, IR Premises, Defect Matrices, etc.)
3. Cross-reference between engines — findings from one feed the next
4. Route through IR Interface where analyzer outputs feed BigLaw construction
5. Apply Fusion Reactor pipeline logic for execution ordering
6. Produce INTEGRATED SYNTHESIS fusing all engine outputs
7. Confidence-calibrate every position
8. Adversarial stress-test the final position
9. Conclude with NEXT ACTIONS — specific, sequenced, deadlines where applicable
10. Flag any approaching deadlines from Case Operations`;
  };

  const execute = async (input) => {
    const prompt = buildPrompt(input || question);
    setStatus("loading");
    setResponse("");
    setActivePanel("output");

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 8000,
          system: SYSTEM_PROMPT,
          messages: [...history, { role: "user", content: prompt }],
        }),
      });

      const data = await res.json();
      if (data.error) {
        setResponse(`**Error:** ${data.error.message || JSON.stringify(data.error)}`);
        setStatus("error");
        return;
      }

      const text = data.content?.filter(b => b.type === "text").map(b => b.text).join("\n") || "No response.";
      setResponse(text);
      setHistory(prev => [...prev, { role: "user", content: prompt }, { role: "assistant", content: text }]);
      setStatus("complete");
    } catch (err) {
      setResponse(`**Network error:** ${err.message}`);
      setStatus("error");
    }
  };

  const handleFollowUp = () => {
    if (!followUp.trim()) return;
    execute(followUp);
    setFollowUp("");
  };

  const reset = () => {
    setResponse(""); setStatus("idle"); setHistory([]);
    setFacts(""); setQuestion(""); setFollowUp("");
    setActivePanel("config");
  };

  const statusCfg = {
    idle: { color: "#3a3a3a", text: "STANDBY", pulse: false },
    loading: { color: "#c8a45a", text: "PROCESSING", pulse: true },
    complete: { color: "#4a9a6a", text: "COMPLETE", pulse: false },
    error: { color: "#9a4a4a", text: "ERROR", pulse: false },
  };
  const sc = statusCfg[status];

  return (
    <div style={{ minHeight: "100vh", background: "#090909", color: "#d0d0d0", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        textarea:focus, input:focus { outline:none; border-color:#c8a45a !important; }
        textarea::placeholder, input::placeholder { color:#2a2a2a; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:#0a0a0a; }
        ::-webkit-scrollbar-thumb { background:#2a2a2a; border-radius:3px; }
        .rx-out h1 { font-size:15px; color:#c8a45a; border-bottom:1px solid #1a1a1a; padding-bottom:6px; margin:20px 0 10px; font-family:'JetBrains Mono',monospace; font-weight:700; letter-spacing:0.05em; }
        .rx-out h2 { font-size:13px; color:#a0a0a0; margin:16px 0 6px; font-family:'JetBrains Mono',monospace; font-weight:600; }
        .rx-out h3 { font-size:12px; color:#8a8a8a; margin:12px 0 4px; font-family:'JetBrains Mono',monospace; font-weight:600; }
        .rx-out p { font-size:12.5px; color:#b0b0b0; line-height:1.7; margin:4px 0; font-family:Georgia,serif; }
        .rx-out strong { color:#d4b96a; }
        .rx-out em { color:#9ab0c8; }
        .rx-out ul,.rx-out ol { margin:4px 0 4px 16px; color:#a0a0a0; font-size:12.5px; line-height:1.7; font-family:Georgia,serif; }
        .rx-out code { background:#151515; padding:1px 5px; border-radius:2px; font-size:11px; color:#c8a45a; font-family:'JetBrains Mono',monospace; }
        .rx-out pre { background:#080808; border:1px solid #1a1a1a; border-radius:4px; padding:12px; overflow-x:auto; margin:10px 0; }
        .rx-out pre code { background:none; padding:0; font-size:11px; color:#8a8a8a; line-height:1.5; }
        .rx-out blockquote { border-left:2px solid #c8a45a; padding-left:12px; margin:10px 0; color:#7a7a7a; font-style:italic; }
        .rx-out table { border-collapse:collapse; width:100%; margin:10px 0; font-size:11px; font-family:'JetBrains Mono',monospace; }
        .rx-out th { background:#131313; color:#c8a45a; padding:6px 10px; text-align:left; border:1px solid #1a1a1a; font-weight:600; font-size:10px; text-transform:uppercase; letter-spacing:0.05em; }
        .rx-out td { padding:6px 10px; border:1px solid #151515; color:#9a9a9a; }
        .rx-out tr:nth-child(even) { background:rgba(255,255,255,0.01); }
        .rx-out hr { border:none; border-top:1px solid #1a1a1a; margin:16px 0; }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{
        borderBottom: "1px solid #151515", padding: "12px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "linear-gradient(180deg, #0d0d0d, #090909)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "5px",
            background: "linear-gradient(135deg, #c8a45a18, #c8a45a06)",
            border: "1px solid #c8a45a28", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "16px",
          }}>⚖</div>
          <div>
            <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", color: "#c8a45a" }}>
              DEFENCE STRATEGY REACTOR
            </div>
            <div style={{ fontSize: "9px", color: "#3a3a3a", letterSpacing: "0.12em", marginTop: "1px" }}>
              10 ENGINES · TYPED PIPELINES · COUNSEL-GRADE OUTPUT
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "5px",
            padding: "3px 8px", borderRadius: "3px",
            border: `1px solid ${sc.color}`, background: `${sc.color}11`,
          }}>
            <div style={{
              width: "5px", height: "5px", borderRadius: "50%", background: sc.color,
              animation: sc.pulse ? "pulse 1.5s ease-in-out infinite" : "none",
            }} />
            <span style={{ fontSize: "9px", letterSpacing: "0.12em", color: sc.color, fontWeight: 600 }}>{sc.text}</span>
          </div>
          {totalActive > 0 && (
            <span style={{
              fontSize: "9px", padding: "3px 8px", border: "1px solid #1a1a1a",
              borderRadius: "3px", color: "#4a4a4a",
            }}>{totalActive} MODULES</span>
          )}
          {history.length > 0 && (
            <span style={{
              fontSize: "9px", padding: "3px 8px", border: "1px solid #1a1a1a",
              borderRadius: "3px", color: "#4a4a4a",
            }}>{Math.floor(history.length / 2)} TURNS</span>
          )}
        </div>
      </div>

      {/* ── TAB BAR ── */}
      <div style={{ display: "flex", borderBottom: "1px solid #151515", background: "#0b0b0b" }}>
        {["config", "output"].map(t => (
          <button key={t} onClick={() => setActivePanel(t)} style={{
            padding: "8px 20px", border: "none",
            borderBottom: activePanel === t ? "2px solid #c8a45a" : "2px solid transparent",
            background: "none", color: activePanel === t ? "#c8a45a" : "#3a3a3a",
            fontSize: "10px", letterSpacing: "0.12em", fontFamily: "'JetBrains Mono', monospace",
            fontWeight: activePanel === t ? 600 : 400, cursor: "pointer", textTransform: "uppercase",
          }}>{t === "config" ? "CONFIGURE" : "OUTPUT"}</button>
        ))}
        <div style={{ flex: 1 }} />
        <button onClick={reset} style={{
          padding: "8px 14px", border: "none", background: "none", color: "#2a2a2a",
          fontSize: "10px", letterSpacing: "0.08em", fontFamily: "'JetBrains Mono', monospace", cursor: "pointer",
        }}>RESET</button>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ display: "flex", height: "calc(100vh - 85px)" }}>

        {/* ── LEFT: ENGINE SELECTOR (always visible) ── */}
        <div style={{
          width: "260px", minWidth: "260px", borderRight: "1px solid #151515",
          background: "#0a0a0a", overflowY: "auto", padding: "12px",
        }}>
          <div style={{
            fontSize: "9px", letterSpacing: "0.18em", color: "#4a4a4a", marginBottom: "8px",
            fontWeight: 700, textTransform: "uppercase",
          }}>ENGINES</div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {Object.entries(ENGINES).map(([k, e]) => (
              <EngineCard
                key={k}
                engineKey={k}
                engine={e}
                selected={selections[k]}
                onToggle={(id) => toggleModule(k, id)}
                collapsed={collapsed[k]}
                onToggleCollapse={() => setCollapsed(c => ({ ...c, [k]: !c[k] }))}
              />
            ))}
          </div>

          <div style={{ marginTop: "12px" }}>
            <div style={{
              fontSize: "9px", letterSpacing: "0.18em", color: "#4a4a4a", marginBottom: "6px",
              fontWeight: 700, textTransform: "uppercase",
            }}>PRESETS</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              {PRESETS.map(p => (
                <button key={p.label} onClick={() => applyPreset(p)} title={p.desc} style={{
                  padding: "5px 8px", borderRadius: "3px", border: "1px solid #1a1a1a",
                  background: "#0c0c0c", color: "#6a6a6a", fontSize: "10px", cursor: "pointer",
                  fontFamily: "'JetBrains Mono', monospace", textAlign: "left",
                  transition: "all 0.15s",
                }}>{p.label}</button>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: CONFIG / OUTPUT ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>

          {activePanel === "config" && (
            <div>
              <PipelineViz selections={selections} />

              <MatterProfile profile={matterProfile} setProfile={setMatterProfile}
                show={showMatter} setShow={setShowMatter} />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{
                    display: "block", fontSize: "9px", letterSpacing: "0.15em", color: "#c8a45a",
                    marginBottom: "4px", fontWeight: 700, textTransform: "uppercase",
                  }}>CASE FACTS</label>
                  <textarea value={facts} onChange={e => setFacts(e.target.value)}
                    placeholder="Material facts, evidence, procedural history, statutory provisions..."
                    style={{
                      width: "100%", height: "180px", background: "#0b0b0b", border: "1px solid #1a1a1a",
                      borderRadius: "4px", padding: "10px 12px", color: "#a0a0a0", fontSize: "12px",
                      fontFamily: "'JetBrains Mono', monospace", lineHeight: "1.7", resize: "vertical",
                      boxSizing: "border-box",
                    }} />
                </div>
                <div>
                  <label style={{
                    display: "block", fontSize: "9px", letterSpacing: "0.15em", color: "#c8a45a",
                    marginBottom: "4px", fontWeight: 700, textTransform: "uppercase",
                  }}>QUESTION / TASK</label>
                  <textarea value={question} onChange={e => setQuestion(e.target.value)}
                    placeholder="Build my s.138 exclusion argument... Identify prosecution weaknesses... Prepare cross-examination..."
                    style={{
                      width: "100%", height: "180px", background: "#0b0b0b", border: "1px solid #1a1a1a",
                      borderRadius: "4px", padding: "10px 12px", color: "#a0a0a0", fontSize: "12px",
                      fontFamily: "'JetBrains Mono', monospace", lineHeight: "1.7", resize: "vertical",
                      boxSizing: "border-box",
                    }} />
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <button onClick={() => execute(question)} disabled={status === "loading" || (!facts.trim() && !question.trim())}
                  style={{
                    padding: "10px 28px", borderRadius: "4px", border: "1px solid #c8a45a",
                    background: status === "loading" ? "#151515" : "linear-gradient(135deg, rgba(200,164,90,0.18), rgba(200,164,90,0.06))",
                    color: "#c8a45a", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em",
                    fontFamily: "'JetBrains Mono', monospace", cursor: status === "loading" ? "wait" : "pointer",
                    textTransform: "uppercase",
                    opacity: (!facts.trim() && !question.trim()) ? 0.3 : 1,
                  }}>
                  {status === "loading" ? "⟳ PROCESSING..." : "▶ EXECUTE REACTOR"}
                </button>
                <span style={{ fontSize: "10px", color: "#3a3a3a" }}>
                  {totalActive} modules across {Object.values(selections).filter(v => v.length > 0).length} engines
                </span>
              </div>
            </div>
          )}

          {activePanel === "output" && (
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              {status === "idle" ? (
                <div style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: "6px", border: "1px solid #151515", background: "#0b0b0b", minHeight: "400px",
                }}>
                  <div style={{ textAlign: "center", color: "#2a2a2a" }}>
                    <div style={{ fontSize: "40px", marginBottom: "12px", opacity: 0.2 }}>⚖</div>
                    <div style={{ fontSize: "10px", letterSpacing: "0.18em", fontFamily: "'JetBrains Mono', monospace" }}>
                      AWAITING INPUT
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <PipelineViz selections={selections} />
                  <div ref={outputRef} className="rx-out" style={{
                    flex: 1, borderRadius: "6px", border: "1px solid #151515",
                    background: "#0b0b0b", padding: "20px", overflowY: "auto",
                    minHeight: "300px", maxHeight: "calc(100vh - 260px)",
                  }}>
                    <div dangerouslySetInnerHTML={{ __html: renderMd(response || "") }} />
                    {status === "loading" && (
                      <span style={{
                        display: "inline-block", width: "7px", height: "14px",
                        background: "#c8a45a", animation: "blink 1s step-end infinite",
                      }} />
                    )}
                  </div>

                  {/* Follow-up */}
                  {status === "complete" && (
                    <div style={{
                      marginTop: "12px", display: "flex", gap: "8px", alignItems: "stretch",
                    }}>
                      <input value={followUp} onChange={e => setFollowUp(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleFollowUp()}
                        placeholder="Follow-up: refine, drill deeper, or request specific deliverable..."
                        style={{
                          flex: 1, background: "#0b0b0b", border: "1px solid #1a1a1a",
                          borderRadius: "4px", padding: "8px 12px", color: "#a0a0a0",
                          fontSize: "12px", fontFamily: "'JetBrains Mono', monospace",
                        }} />
                      <button onClick={handleFollowUp} disabled={!followUp.trim()} style={{
                        padding: "8px 16px", borderRadius: "4px", border: "1px solid #c8a45a44",
                        background: "rgba(200,164,90,0.08)", color: "#c8a45a",
                        fontSize: "10px", fontWeight: 600, fontFamily: "'JetBrains Mono', monospace",
                        cursor: followUp.trim() ? "pointer" : "default",
                        opacity: followUp.trim() ? 1 : 0.3, letterSpacing: "0.1em",
                      }}>SEND ▶</button>
                      <button onClick={() => {
                        navigator.clipboard?.writeText(response);
                      }} style={{
                        padding: "8px 12px", borderRadius: "4px", border: "1px solid #1a1a1a",
                        background: "none", color: "#4a4a4a",
                        fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", cursor: "pointer",
                        letterSpacing: "0.08em",
                      }}>COPY</button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
