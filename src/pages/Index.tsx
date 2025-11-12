import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import LoanApplicationForm from '@/components/LoanApplicationForm';

const Index = () => {
  const [loanAmount, setLoanAmount] = useState([15000]);
  const [loanTerm, setLoanTerm] = useState([14]);
  const [activeSection, setActiveSection] = useState('home');
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const interestRate = 0.01;
  const totalAmount = loanAmount[0] + (loanAmount[0] * interestRate * loanTerm[0]);
  const dailyPayment = totalAmount / loanTerm[0];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Zap" className="text-primary" size={32} />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              CashUp
            </span>
          </div>
          <div className="hidden md:flex gap-6">
            {['Главная', 'Займы', 'Условия', 'О компании', 'FAQ', 'Контакты'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item}
              </button>
            ))}
          </div>
          <Button 
            onClick={() => setShowApplicationForm(true)}
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            Получить займ
          </Button>
        </div>
      </nav>

      <section id="главная" className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Деньги за{' '}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  15 минут
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Онлайн займы до 30 000 ₽ без отказа. Быстрое одобрение, минимум документов, деньги на карту.
              </p>
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  onClick={() => setShowApplicationForm(true)}
                  className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 text-lg px-8"
                >
                  Оформить займ
                  <Icon name="ArrowRight" className="ml-2" size={20} />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg"
                  onClick={() => scrollToSection('главная')}
                >
                  Калькулятор
                </Button>
              </div>
              <div className="flex gap-8 mt-12">
                <div>
                  <div className="text-3xl font-bold text-primary">0.5%</div>
                  <div className="text-sm text-muted-foreground">ставка в день</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary">15 мин</div>
                  <div className="text-sm text-muted-foreground">на получение</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">24/7</div>
                  <div className="text-sm text-muted-foreground">поддержка</div>
                </div>
              </div>
            </div>

            <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-2xl animate-scale-in">
              <h3 className="text-2xl font-bold mb-6">Калькулятор займа</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Сумма займа</label>
                    <span className="text-2xl font-bold text-primary">{loanAmount[0].toLocaleString()} ₽</span>
                  </div>
                  <Slider
                    value={loanAmount}
                    onValueChange={setLoanAmount}
                    min={1000}
                    max={30000}
                    step={1000}
                    className="my-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 000 ₽</span>
                    <span>30 000 ₽</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Срок займа</label>
                    <span className="text-2xl font-bold text-secondary">{loanTerm[0]} дней</span>
                  </div>
                  <Slider
                    value={loanTerm}
                    onValueChange={setLoanTerm}
                    min={7}
                    max={30}
                    step={1}
                    className="my-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>7 дней</span>
                    <span>30 дней</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Ежедневный платеж:</span>
                    <span className="font-semibold">{dailyPayment.toFixed(2)} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">К возврату:</span>
                    <span className="text-2xl font-bold text-primary">{totalAmount.toFixed(2)} ₽</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90" 
                  size="lg"
                  onClick={() => setShowApplicationForm(true)}
                >
                  Получить деньги
                  <Icon name="Rocket" className="ml-2" size={20} />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="займы" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4">Наши займы</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Выберите подходящий вариант</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'Zap', title: 'Первый займ', rate: '0%', amount: 'До 15 000 ₽', term: '7-14 дней', color: 'from-primary to-purple-600' },
              { icon: 'TrendingUp', title: 'Стандартный', rate: '0.5%', amount: 'До 30 000 ₽', term: '7-30 дней', color: 'from-secondary to-pink-600' },
              { icon: 'Crown', title: 'VIP займ', rate: '0.3%', amount: 'До 50 000 ₽', term: '30-60 дней', color: 'from-accent to-orange-600' }
            ].map((loan, idx) => (
              <Card key={idx} className="p-6 hover:shadow-xl transition-all hover:-translate-y-2 duration-300 bg-white">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${loan.color} flex items-center justify-center mb-4`}>
                  <Icon name={loan.icon as any} className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">{loan.title}</h3>
                <div className="text-3xl font-bold mb-4 bg-gradient-to-r ${loan.color} bg-clip-text text-transparent">
                  {loan.rate} в день
                </div>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <Icon name="Check" className="text-green-500" size={20} />
                    <span>{loan.amount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Check" className="text-green-500" size={20} />
                    <span>{loan.term}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Check" className="text-green-500" size={20} />
                    <span>Без отказа</span>
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => setShowApplicationForm(true)}
                >
                  Оформить
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="условия" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Условия получения</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: 'UserCheck', title: 'Возраст от 18 лет', desc: 'Паспорт гражданина РФ' },
              { icon: 'CreditCard', title: 'Банковская карта', desc: 'Для перевода денег' },
              { icon: 'Smartphone', title: 'Мобильный телефон', desc: 'Для связи и подтверждения' },
              { icon: 'FileText', title: 'Минимум документов', desc: 'Только паспорт и СНИЛС' }
            ].map((item, idx) => (
              <Card key={idx} className="p-6 bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon as any} className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="о-компании" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-6">О компании</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            CashUp — современный сервис микрозаймов с прозрачными условиями
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { number: '50 000+', label: 'Выданных займов' },
              { number: '98%', label: 'Одобрение заявок' },
              { number: '5 лет', label: 'На рынке' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          <Card className="p-8 bg-white">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Мы работаем на рынке финансовых услуг с 2019 года. Наша миссия — делать финансы доступными для каждого. 
              Мы используем современные технологии для быстрого одобрения заявок и обеспечиваем полную прозрачность условий. 
              Более 50 000 клиентов уже доверились нам и получили быстрые займы на выгодных условиях.
            </p>
          </Card>
        </div>
      </section>

      <section id="faq" className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-12">Частые вопросы</h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: 'Как быстро я получу деньги?',
                a: 'После одобрения заявки деньги поступают на карту в течение 15 минут. Заявки обрабатываются автоматически 24/7.'
              },
              {
                q: 'Какие документы нужны для займа?',
                a: 'Для получения займа нужен только паспорт РФ и СНИЛС. Никаких справок о доходах не требуется.'
              },
              {
                q: 'Могу ли я получить займ с плохой кредитной историей?',
                a: 'Да! Мы одобряем заявки даже с негативной кредитной историей. Каждую заявку рассматриваем индивидуально.'
              },
              {
                q: 'Как происходит погашение займа?',
                a: 'Вы можете погасить займ любым удобным способом: через личный кабинет, банковской картой или через платежные системы.'
              },
              {
                q: 'Есть ли скрытые комиссии?',
                a: 'Нет! Все условия прозрачны. Вы видите полную стоимость займа в калькуляторе до подачи заявки.'
              }
            ].map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:text-primary">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="контакты" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Контакты</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'Phone', title: 'Телефон', info: '8 (800) 555-35-35', sub: 'Звонок бесплатный' },
              { icon: 'Mail', title: 'Email', info: 'support@cashup.su', sub: 'Ответим в течение часа' },
              { icon: 'Clock', title: 'Режим работы', info: '24 / 7', sub: 'Без выходных' }
            ].map((contact, idx) => (
              <Card key={idx} className="p-6 text-center bg-white hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                  <Icon name={contact.icon as any} className="text-white" size={28} />
                </div>
                <h3 className="font-bold text-lg mb-2">{contact.title}</h3>
                <p className="text-xl font-semibold text-primary mb-1">{contact.info}</p>
                <p className="text-sm text-muted-foreground">{contact.sub}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-purple-900 via-pink-900 to-orange-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Zap" size={28} />
                <span className="text-2xl font-bold">CashUp</span>
              </div>
              <p className="text-white/80">Онлайн займы за 15 минут</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Займы</h4>
              <div className="space-y-2 text-white/80">
                <div>Первый займ</div>
                <div>Стандартный</div>
                <div>VIP займ</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Компания</h4>
              <div className="space-y-2 text-white/80">
                <div>О нас</div>
                <div>Контакты</div>
                <div>Вопросы и ответы</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Документы</h4>
              <div className="space-y-2 text-white/80">
                <div>Пользовательское соглашение</div>
                <div>Политика конфиденциальности</div>
                <div>Условия займа</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-8 text-center text-white/60">
            <p>© 2024 CashUp. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {showApplicationForm && (
        <LoanApplicationForm onClose={() => setShowApplicationForm(false)} />
      )}
    </div>
  );
};

export default Index;