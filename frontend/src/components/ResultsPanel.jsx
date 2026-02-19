import React, { useState } from 'react'
import RiskCard from './results/RiskCard'
import ProfileCard from './results/ProfileCard'
import RecommendationCard from './results/RecommendationCard'
import ExplanationCard from './results/ExplanationCard'
import JsonViewer from './results/JsonViewer'

export default function ResultsPanel({ data }){
  if(!data) return <div className="text-slate-400">No results yet — run an analysis to see results.</div>

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
      <div className="col-span-1 md:col-span-1">
        <RiskCard result={data} />
      </div>
      <div className="col-span-1 md:col-span-1">
        <ProfileCard profile={data.profile || {}} />
      </div>
      <div className="col-span-1 md:col-span-1">
        <RecommendationCard rec={data.recommendation || {}} />
      </div>

      <div className="col-span-1 md:col-span-2">
        <ExplanationCard explanation={data.explanation} />
      </div>

      <div className="col-span-1 md:col-span-1">
        <JsonViewer json={data} />
      </div>
    </div>
  )
}
