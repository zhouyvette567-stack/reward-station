import './index.css';

function App() {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#f8f2e9',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '60px 20px',
      boxSizing: 'border-box',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* 1. 标题区域 */}
      <div style={{
        marginBottom: '40px',
        textAlign: 'center'
      }}>
        <h1 style={{
          color: '#8b7355',
          fontSize: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          🎁🔥 今日嘉奖
        </h1>
      </div>

      {/* 2. Slogan */}
      <p style={{
        marginBottom: '60px',
        color: '#8b7355',
        fontSize: '16px',
        textAlign: 'center'
      }}>
        即使只是一小步，也值得庆贺
      </p>

      {/* 3. 三栏卡片 */}
      <div style={{
        display: 'flex',
        gap: '24px',
        marginBottom: '60px',
        width: '100%',
        maxWidth: '600px'
      }}>
        <div style={{
          flex: 1,
          padding: '20px',
          backgroundColor: '#fff9f0',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#8b7355', marginBottom: '8px' }}>AI夸夸生成器</h3>
          <p style={{ color: '#a0896b', fontSize: '14px' }}>优雅书生风</p>
        </div>
        <div style={{
          flex: 1,
          padding: '20px',
          backgroundColor: '#fff9f0',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#8b7355', marginBottom: '8px' }}>心情盲盒</h3>
          <p style={{ color: '#a0896b', fontSize: '14px' }}>随机生活小任务</p>
        </div>
        <div style={{
          flex: 1,
          padding: '20px',
          backgroundColor: '#fff9f0',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#8b7355', marginBottom: '8px' }}>成就博物馆</h3>
          <p style={{ color: '#a0896b', fontSize: '14px' }}>点亮你的高光时刻</p>
        </div>
      </div>

      {/* 4. 树洞回声模块 */}
      <div style={{
        width: '100%',
        maxWidth: '600px',
        backgroundColor: '#fff9f0',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '80px'
      }}>
        <h3 style={{ color: '#8b7355', marginBottom: '8px' }}>🗣️ 树洞回声</h3>
        <p style={{ color: '#a0896b', fontSize: '14px', marginBottom: '16px' }}>
          AI换位思考，从不同视角重新解读你的故事
        </p>
        {/* 这里保留你现有的视角按钮，不会影响居中 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div style={{ padding: '12px', backgroundColor: '#fff5eb', borderRadius: '8px' }}>
            <span>十年后的你</span>
            <p style={{ fontSize: '12px', color: '#a0896b' }}>以未来视角回望现在</p>
          </div>
          <div style={{ padding: '12px', backgroundColor: '#fff5eb', borderRadius: '8px' }}>
            <span>你的猫咪</span>
            <p style={{ fontSize: '12px', color: '#a0896b' }}>以宠物的视角看世界</p>
          </div>
          <div style={{ padding: '12px', backgroundColor: '#fff5eb', borderRadius: '8px' }}>
            <span>童年的你</span>
            <p style={{ fontSize: '12px', color: '#a0896b' }}>以纯真的眼光看成长</p>
          </div>
          <div style={{ padding: '12px', backgroundColor: '#fff5eb', borderRadius: '8px' }}>
            <span>一棵老树</span>
            <p style={{ fontSize: '12px', color: '#a0896b' }}>以自然的智慧给予力量</p>
          </div>
        </div>
      </div>

      {/* 5. 页脚 */}
      <div style={{
        marginTop: 'auto',
        textAlign: 'center',
        color: '#a0896b',
        fontSize: '14px'
      }}>
        <p>© 2026 今日嘉奖 &nbsp;|&nbsp; 关于 · 分享</p>
      </div>
    </div>
  );
}

export default App;
