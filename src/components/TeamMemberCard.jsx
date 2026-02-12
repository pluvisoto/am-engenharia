import React from 'react';

const TeamMemberCard = ({ member, onDelete, onEdit }) => {
    // Generate Initials
    const initials = member.name
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    return (
        <div className="card" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'var(--primary-light)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.2rem'
                }}>
                    {initials}
                </div>
                <div>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--primary)' }}>{member.name}</h3>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>{member.role}</p>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--accent)', fontWeight: '600' }}>
                        {member.registration}
                    </p>
                </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {member.skills && member.skills.map((skill, idx) => (
                    <span key={idx} className="badge" style={{ background: '#f1f5f9', color: '#475569' }}>
                        {skill}
                    </span>
                ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '10px', marginTop: 'auto', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                    onClick={() => onEdit(member)}
                    style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.9rem' }}
                >
                    Editar
                </button>
                <button
                    onClick={() => onDelete(member.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '0.9rem' }}
                >
                    Excluir
                </button>
            </div>
        </div>
    );
};

export default TeamMemberCard;
