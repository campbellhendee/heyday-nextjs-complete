"use client";
import { useState } from 'react'
import { Calendar, Users, MapPin, Mail, Phone, MessageSquare } from 'lucide-react'
import { BRAND } from '@/lib/brand'

type ServiceType = 'wedding'|'corporate'|'private'|'daily'
 type ContactMethod = 'email'|'phone'|'text'

type FormData = { service: ServiceType|''; date: string; guestCount: string; venue: string; name: string; email: string; phone: string; preferredContact: ContactMethod; message: string }

export default function InquiryForm(){
  const [step,setStep] = useState(1)
  const [data,setData] = useState<FormData>({ service:'', date:'', guestCount:'', venue:'', name:'', email:'', phone:'', preferredContact:'email', message:'' })
  const services = [ {value:'wedding', label:'Wedding', icon:'💐'}, {value:'corporate', label:'Corporate Event', icon:'🏢'}, {value:'private', label:'Private Event', icon:'🥂'}, {value:'daily', label:'Daily Arrangements', icon:'🌸'} ]
  const next=()=> setStep(s=> Math.min(3, s+1))
  const prev=()=> setStep(s=> Math.max(1, s-1))
  const submit=(e: React.FormEvent)=>{ e.preventDefault(); console.log('Inquiry:', data) }
  return (
    <div className="inquiry-form">
      <div className="form-progress"><div className="progress-bar"><div className="progress-fill" style={{width:`${(step/3)*100}%`}}/></div><p className="progress-text">Step {step} of 3</p></div>
      <form onSubmit={submit}>
        {step===1 && (
          <div className="form-step">
            <h3>What brings you to Heyday?</h3>
            <div className="service-selector">
              {services.map(s=> (
                <label key={s.value} className="service-option">
                  <input type="radio" name="service" value={s.value} checked={data.service===s.value} onChange={(e)=>setData({...data, service:e.target.value as ServiceType})}/>
                  <div className="service-card"><span className="service-icon">{s.icon}</span><span className="service-label">{s.label}</span></div>
                </label>
              ))}
            </div>
            {data.service && (
              <div className="form-group"><label><Calendar size={20}/>Event Date</label><input type="date" value={data.date} onChange={(e)=>setData({...data, date:e.target.value})} min={new Date().toISOString().split('T')[0]}/></div>
            )}
            {data.service && data.service!=='daily' && (
              <>
                <div className="form-group"><label><Users size={20}/>Guest Count</label><input type="number" value={data.guestCount} onChange={(e)=>setData({...data, guestCount:e.target.value})} placeholder="Approximate number"/></div>
                <div className="form-group"><label><MapPin size={20}/>Venue</label><input type="text" value={data.venue} onChange={(e)=>setData({...data, venue:e.target.value})} placeholder="Venue name or 'TBD'"/></div>
              </>
            )}
            <button type="button" className="btn btn--primary btn--large" onClick={next} disabled={!data.service}>Continue</button>
          </div>
        )}
        {step===2 && (
          <div className="form-step">
            <h3>How can we reach you?</h3>
            <div className="form-group"><label>Name</label><input type="text" value={data.name} onChange={(e)=>setData({...data, name:e.target.value})} required/></div>
            <div className="form-group"><label><Mail size={20}/>Email</label><input type="email" value={data.email} onChange={(e)=>setData({...data, email:e.target.value})} required/></div>
            <div className="form-group"><label><Phone size={20}/>Phone</label><input type="tel" value={data.phone} onChange={(e)=>setData({...data, phone:e.target.value})} required/></div>
            <div className="form-group"><label>Preferred Contact Method</label><div className="contact-options">{(['email','phone','text'] as ContactMethod[]).map(m=> (
              <label key={m} className="contact-option"><input type="radio" name="contactMethod" value={m} checked={data.preferredContact===m} onChange={(e)=>setData({...data, preferredContact:e.target.value as ContactMethod})}/><span>{m[0].toUpperCase()+m.slice(1)}</span></label>
            ))}</div></div>
            <div className="form-actions"><button type="button" onClick={prev} className="btn">Back</button><button type="button" onClick={next} className="btn btn--primary">Continue</button></div>
          </div>
        )}
        {step===3 && (
          <div className="form-step">
            <h3>Tell us about your vision</h3>
            <div className="form-group"><label><MessageSquare size={20}/>Additional Details</label><textarea rows={5} value={data.message} onChange={(e)=>setData({...data, message:e.target.value})} placeholder="Share inspiration, color preferences, special requests..."/></div>
            <div className="response-time-notice"><p>✨ We typically respond within 24 hours</p><p>For events within 48 hours, please call us directly at {BRAND.phone.display}</p></div>
            <div className="form-actions"><button type="button" onClick={prev} className="btn">Back</button><button type="submit" className="btn btn--primary btn--large">Send Inquiry</button></div>
          </div>
        )}
      </form>
    </div>
  )
}
