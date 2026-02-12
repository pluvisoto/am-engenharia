
import React from 'react';

const TableOfContents = ({ items }) => {
    return (
        <div style={{ padding: '60px', minHeight: '275mm', backgroundColor: '#fff', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--doc-navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '18pt' }}>∑</div>
                <h2 style={{
                    fontSize: '24pt',
                    fontWeight: '900',
                    margin: 0,
                    color: 'var(--doc-navy)',
                    letterSpacing: '1px'
                }}>
                    SUMÁRIO EXECUTIVO
                </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ fontWeight: '800', color: 'var(--doc-navy)', fontSize: '12pt', minWidth: '30px' }}>
                            {item.number}.
                        </span>
                        <span style={{ color: '#1e293b', fontSize: '11pt', fontWeight: '600' }}>
                            {item.label}
                        </span>
                        <div style={{ flex: 1, borderBottom: '2px dotted #e2e8f0', marginBottom: '6px' }}></div>
                        <span style={{ fontWeight: '800', color: 'var(--doc-emerald)', fontSize: '12pt' }}>PÁG. {item.page}</span>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '60px', padding: '30px', borderLeft: '4px solid var(--doc-emerald)', backgroundColor: 'var(--doc-gray)', borderRadius: '0 8px 8px 0' }}>
                <p style={{ margin: 0, fontSize: '10pt', color: '#475569', lineHeight: '1.6' }}>
                    <strong>Nota de Conformidade:</strong> Este sumário reflete a estrutura técnica do PGR/PCMSO conforme exigido pela NR-01 e NR-07. A numeração das páginas pode variar dependendo da complexidade do inventário de riscos e número de postos de trabalho avaliados.
                </p>
            </div>
        </div>
    );
};

export default TableOfContents;
