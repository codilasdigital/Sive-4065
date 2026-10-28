import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, Eye, EyeOff, Mail, LockKeyhole, ShieldCheck, Truck, Warehouse, Calculator, CreditCard, KeyRound, Check, X, ChevronRight, CircleHelp, Fingerprint, SlidersHorizontal, Menu } from 'lucide-react';

const stages = [
  { name: 'Traslado', icon: Truck, detail: 'Conecta la grúa con el patio y registra el traslado del vehículo inmovilizado.' },
  { name: 'Ingreso al patio', icon: Warehouse, detail: 'Centraliza el ingreso y la permanencia del vehículo en el patio dentro de un mismo registro.' },
  { name: 'Liquidación', icon: Calculator, detail: 'Aplica tarifas parametrizables para liquidar los conceptos correspondientes, sin tocar las fórmulas.' },
  { name: 'Pago', icon: CreditCard, detail: 'Vincula el pago con la liquidación. La integración con la pasarela PSE está pendiente para la puesta en servicio.' },
  { name: 'Entrega', icon: KeyRound, detail: 'La salida requiere autorización del director antes de entregar el vehículo.' },
];
type Modal = 'about' | 'contact' | 'privacy' | 'terms' | 'cookies' | 'help' | null;
const info = {
  about: { title: 'Acerca de SIVE', tag: 'QUIÉNES SOMOS', text: 'SIVE es el Sistema Integral de Vehículos Inmovilizados. Su propuesta es conectar la grúa, el patio, la liquidación, el pago y la entrega en un solo sistema, con responsables y registros a lo largo del proceso.', note: 'La información institucional, el equipo y la razón social están pendientes de incorporar con contenido oficial.' },
  contact: { title: 'Hablemos de tu organismo', tag: 'CONTACTO', text: 'Si deseas conocer la plataforma, utiliza la opción «Solicitar suscripción» para explorar el formulario de interés.', note: 'Los canales oficiales de contacto están pendientes. Este prototipo no envía mensajes ni registra solicitudes.' },
  privacy: { title: 'Política de privacidad', tag: 'INFORMACIÓN LEGAL', text: 'Aquí se publicará la política oficial de tratamiento de datos personales de SIVE.', note: 'Documento pendiente de aprobación. Este prototipo no autentica usuarios ni envía los datos de los formularios.' },
  terms: { title: 'Términos y condiciones', tag: 'INFORMACIÓN LEGAL', text: 'Aquí se incluirán las condiciones oficiales de acceso, uso y suscripción a la plataforma.', note: 'Documento legal pendiente. La demostración no crea cuentas, contratos ni obligaciones de pago.' },
  cookies: { title: 'Información sobre cookies', tag: 'INFORMACIÓN LEGAL', text: 'La información oficial sobre cookies y tecnologías de medición deberá completarse antes de la puesta en servicio.', note: 'Pendiente: inventario de tecnologías, finalidades y mecanismo de consentimiento aplicable.' },
  help: { title: '¿Necesitas ayuda para ingresar?', tag: 'CENTRO DE AYUDA', text: 'Ingresa con el correo y la contraseña que te entregó el administrador de tu organismo. Si no tienes acceso, solicita asistencia al administrador del Organismo de Tránsito.', note: 'En este prototipo puedes explorar el inicio de sesión y la recuperación de contraseña, pero no se conectan al sistema actual.' },
};

export default function SiveHome() {
  const [mode, setMode] = useState<'login' | 'subscribe' | 'recover'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [stage, setStage] = useState(0);
  const [modal, setModal] = useState<Modal>(null);
  const [menu, setMenu] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLElement>(null);
  useEffect(() => { if (modal) dialog.current?.showModal(); else dialog.current?.close(); }, [modal]);
  const changeMode = (next: typeof mode) => { setMode(next); setMessage(''); };
  const subscribe = () => { changeMode('subscribe'); panel.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); };
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(mode === 'login' ? 'Datos validados en la demostración. El acceso real se conectará al sistema de SIVE; no se ha iniciado sesión.' : mode === 'recover' ? 'Demostración: el enlace de recuperación se enviaría a este correo. No se ha enviado ningún mensaje.' : 'Así se vería la confirmación de tu solicitud. Es una demostración: no se ha enviado ni guardado información.');
  };
  return (
    <div className="sive-shell">
      <header className="site-header">
        <a href="/" className="brand" aria-label="SIVE, inicio"><img src="/brand/sive-white.svg" alt="SIVE" /><span>Sistema Integral de<br />Vehículos Inmovilizados</span></a>
        <nav className={menu ? 'main-nav nav-open' : 'main-nav'} aria-label="Navegación principal">
          <a href="#plataforma" onClick={() => setMenu(false)}>La plataforma</a>
          <button onClick={() => { setModal('about'); setMenu(false); }}>Quiénes somos</button>
          <button onClick={() => { setModal('contact'); setMenu(false); }}>Contacto <ArrowUpRight size={14} /></button>
        </nav>
        <div className="header-side"><span className="early-badge"><i /> Acceso anticipado</span><button className="menu-button" aria-label="Abrir navegación" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button></div>
      </header>

      <main className="main-grid">
        <aside className="access-panel" ref={panel} id="acceso">
          <div className="access-top"><span className="eyebrow">TU ESPACIO DE GESTIÓN</span><div className="access-tabs" aria-label="Opciones de acceso"><button className={mode !== 'subscribe' ? 'active' : ''} onClick={() => changeMode('login')}>Ingresar</button><button className={mode === 'subscribe' ? 'active' : ''} onClick={() => changeMode('subscribe')}>Suscribirse <ArrowUpRight size={13} /></button></div></div>
          <div className="access-content">
            <div className="lock-emblem"><LockKeyhole size={20} strokeWidth={1.6} /></div>
            <h1>{mode === 'login' ? <>Bienvenido<br />de nuevo.</> : mode === 'subscribe' ? <>Tu organismo,<br />más conectado.</> : <>Recupera<br />tu acceso.</>}</h1>
            <p className="access-intro">{mode === 'login' ? 'Ingresa a tu cuenta y continúa con la gestión de tu organismo.' : mode === 'subscribe' ? 'Cuéntanos sobre tu organismo para solicitar acceso a SIVE.' : 'Escribe el correo asociado a tu cuenta para restablecer tu contraseña.'}</p>
            <form key={mode} onSubmit={submit}>
              {mode === 'subscribe' && <label>Organismo de tránsito <span>*</span><div className="input-wrap"><Warehouse size={17} /><input aria-label="Organismo de tránsito" name="organism" placeholder="Nombre de tu organismo" required autoComplete="organization" /></div></label>}
              <label>Correo electrónico <span>*</span><div className="input-wrap"><Mail size={17} /><input aria-label="Correo electrónico" name="email" type="email" placeholder="tu@organismo.gov.co" required autoComplete="email" /></div></label>
              {mode === 'login' && <label>Contraseña <span>*</span><div className="input-wrap"><LockKeyhole size={17} /><input aria-label="Contraseña" name="password" type={showPassword ? 'text' : 'password'} placeholder="Ingresa tu contraseña" required minLength={6} autoComplete="current-password" /><button type="button" aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>}
              {mode === 'login' && <div className="form-options"><label className="remember"><input aria-label="Recordarme" type="checkbox" /> Recordarme</label><button type="button" onClick={() => changeMode('recover')}>¿Olvidaste tu contraseña?</button></div>}
              {mode === 'subscribe' && <label className="remember consent"><input aria-label="Acepto que es una demostración" type="checkbox" required /> <span>Entiendo que este formulario es una demostración y no envía mis datos.</span></label>}
              <button className="primary-button" type="submit">{mode === 'login' ? 'Iniciar sesión' : mode === 'subscribe' ? 'Solicitar suscripción' : 'Recuperar contraseña'}<ArrowRight size={18} /></button>
              {message && <output className="form-message"><Check size={18} /><span>{message}</span></output>}
            </form>
            {mode === 'recover' ? <button className="help-link" onClick={() => changeMode('login')}>Volver al inicio de sesión</button> : <p className="admin-note">{mode === 'login' ? 'Usa las credenciales entregadas por el administrador de tu organismo.' : 'Sin cobros ni creación de cuentas en esta demostración.'}</p>}
          </div>
          <div className="access-bottom"><div className="security-note"><ShieldCheck size={19} /><div><strong>Acceso para tu organismo</strong><span>Control y trazabilidad en cada paso.</span></div></div><div className="access-divider" /><button className="help-link" onClick={() => setModal('help')}><CircleHelp size={15} /> ¿Necesitas ayuda para ingresar? <ArrowUpRight size={13} /></button></div>
        </aside>

        <section className="landing-panel" id="plataforma" aria-label="Información sobre SIVE">
          <div className="hero">
            <div className="hero-copy"><span className="hero-tag"><i /> UNA PLATAFORMA. TODO EL PROCESO.</span><h2>Todo el ciclo.<br />Un solo sistema.<span>Más control.</span></h2><p>Del traslado a la entrega, SIVE conecta cada etapa del vehículo inmovilizado. Sin hojas sueltas. Sin perder el rastro.</p><button className="explore-button" onClick={subscribe}>Conoce lo que SIVE puede hacer por ti <span><ArrowUpRight size={19} /></span></button></div>
            <div className="brand-art" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="art-core"><img src="/brand/sive-mark-dark.svg" alt="" /></div><div className="floating-label label-one"><span><ShieldCheck size={15} /></span> Control en cada etapa</div><div className="floating-label label-two"><i /> Todo conectado</div><span className="art-cross cross-one">+</span><span className="art-cross cross-two">+</span><span className="orbit-dot" /></div>
          </div>

          <div className="cycle-section"><div className="section-heading"><h3>Un proceso conectado, de principio a fin.</h3><span>EL CICLO SIVE <ArrowDownIcon /></span></div><div className="stage-list" role="tablist" aria-label="Etapas del ciclo">{stages.map((item, index) => <button key={item.name} role="tab" id={`stage-${index}`} aria-controls="stage-detail" aria-selected={stage === index} onClick={() => setStage(index)} className={stage === index ? 'stage active-stage' : 'stage'}><span className="stage-number">0{index + 1}</span><item.icon size={23} strokeWidth={1.6} /><strong>{item.name}</strong>{index < 4 && <ChevronRight className="stage-chevron" size={15} />}</button>)}</div><div className="stage-detail" role="tabpanel" id="stage-detail" aria-labelledby={`stage-${stage}`}><span className="detail-dot" /><p>{stages[stage].detail}</p></div></div>

          <div className="benefits"><div className="benefit"><Fingerprint size={23} strokeWidth={1.6} /><h3>Cada paso deja huella</h3><p>Un responsable, una hora y un registro que no se puede alterar.</p></div><div className="benefit"><SlidersHorizontal size={23} strokeWidth={1.6} /><h3>Tarifas a tu medida</h3><p>Parametriza las tarifas de tu organismo, sin tocar las fórmulas.</p></div><div className="benefit"><ShieldCheck size={23} strokeWidth={1.6} /><h3>Entrega con autorización</h3><p>Control de salida y auditoría con verificación de integridad.</p></div></div>

          <div className="early-access"><div><span className="early-label"><i /> ESTAMOS CONSTRUYENDO LO QUE SIGUE</span><h3>Conecta tu organismo con SIVE.</h3><p>Acceso anticipado. Puesta en servicio al completar las integraciones<br className="desktop-break" /> con RUNT, SIMIT y la pasarela de pagos PSE.</p></div><button onClick={subscribe} aria-label="Solicitar suscripción"><ArrowUpRight size={25} /></button></div>
        </section>
      </main>
      <footer className="site-footer"><div><span className="footer-brand">SIVE</span><span>Gestión conectada. De principio a fin.</span></div><nav aria-label="Información legal"><button onClick={() => setModal('terms')}>Términos y condiciones</button><button onClick={() => setModal('privacy')}>Privacidad</button><button onClick={() => setModal('cookies')}>Cookies</button></nav><span className="prototype-label"><i /> Prototipo navegable</span></footer>
      <dialog ref={dialog} onCancel={() => setModal(null)} aria-labelledby="dialog-title" className="info-dialog">{modal && <div className="dialog-content"><button className="dialog-close" aria-label="Cerrar" onClick={() => setModal(null)}><X size={22} /></button><span className="eyebrow">{info[modal].tag}</span><h2 id="dialog-title">{info[modal].title}</h2><p>{info[modal].text}</p><div className="pending-note">{info[modal].note}</div>{modal === 'contact' && <button className="primary-button" onClick={() => { setModal(null); subscribe(); }}>Explorar solicitud <ArrowRight size={17} /></button>}<button className="dialog-back" onClick={() => setModal(null)}>Volver a la página <ArrowRight size={15} /></button></div>}</dialog>
    </div>
  );
}
function ArrowDownIcon() { return <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 2v12m-4-4 4 4 4-4" stroke="currentColor" strokeWidth="1.3" /></svg>; }