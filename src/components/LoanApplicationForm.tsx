import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';

interface LoanApplicationFormProps {
  onClose: () => void;
}

const LoanApplicationForm = ({ onClose }: LoanApplicationFormProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phone: '+7',
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: '',
    passportSeries: '',
    passportNumber: '',
    passportPhoto: null as File | null,
    transferMethod: 'card',
    cardNumber: '',
    phoneNumber: '+7',
    sbpBank: '',
    agreedToTerms: false
  });

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, passportPhoto: e.target.files![0] }));
    }
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log('Заявка отправлена:', formData);
    alert('Заявка успешно отправлена! Мы свяжемся с вами в течение 15 минут.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 border-none">
        <div className="p-8 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white"
          >
            <Icon name="X" size={24} />
          </button>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Регистрация</h2>
            <p className="text-white/90 text-lg">
              {step === 1 && 'Пожалуйста, введите ваш номер телефона и личные данные'}
              {step === 2 && 'Загрузите фото паспорта для подтверждения личности'}
              {step === 3 && 'Выберите способ получения денег'}
            </p>
          </div>

          <Progress value={progress} className="mb-8 h-2 bg-white/20" />

          <div className="bg-white rounded-3xl p-8">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-gray-700 mb-2 block">Номер телефона*</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="h-14 rounded-2xl bg-purple-50 border-none text-lg"
                    placeholder="+7"
                  />
                </div>

                <div>
                  <Label className="text-gray-700 mb-2 block">Фамилия*</Label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="h-14 rounded-2xl bg-purple-50 border-none text-lg"
                    placeholder="Иванов"
                  />
                </div>

                <div>
                  <Label className="text-gray-700 mb-2 block">Имя*</Label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="h-14 rounded-2xl bg-purple-50 border-none text-lg"
                    placeholder="Иван"
                  />
                </div>

                <div>
                  <Label className="text-gray-700 mb-2 block">Отчество</Label>
                  <Input
                    value={formData.middleName}
                    onChange={(e) => handleInputChange('middleName', e.target.value)}
                    className="h-14 rounded-2xl bg-purple-50 border-none text-lg"
                    placeholder="Иванович"
                  />
                </div>

                <div>
                  <Label className="text-gray-700 mb-2 block">Дата рождения*</Label>
                  <Input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    className="h-14 rounded-2xl bg-purple-50 border-none text-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-700 mb-2 block">Серия*</Label>
                    <Input
                      value={formData.passportSeries}
                      onChange={(e) => handleInputChange('passportSeries', e.target.value)}
                      className="h-14 rounded-2xl bg-purple-50 border-none text-lg"
                      placeholder="1234"
                      maxLength={4}
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700 mb-2 block">Номер паспорта*</Label>
                    <Input
                      value={formData.passportNumber}
                      onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                      className="h-14 rounded-2xl bg-purple-50 border-none text-lg"
                      placeholder="567890"
                      maxLength={6}
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-4">
                  <Checkbox
                    checked={formData.agreedToTerms}
                    onCheckedChange={(checked) => handleInputChange('agreedToTerms', checked)}
                    className="mt-1"
                  />
                  <label className="text-sm text-gray-600">
                    Я ознакомлен и согласен со{' '}
                    <span className="text-blue-600 underline cursor-pointer">следующим</span>
                  </label>
                </div>

                <Button
                  onClick={nextStep}
                  disabled={!formData.phone || !formData.firstName || !formData.lastName || !formData.birthDate || !formData.agreedToTerms}
                  className="w-full h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-xl font-semibold"
                >
                  Продолжить
                  <Icon name="ArrowRight" className="ml-2" size={24} />
                </Button>

                <p className="text-center text-sm text-gray-500">
                  Уже есть аккаунт?{' '}
                  <span className="text-blue-600 underline cursor-pointer font-semibold">Войти</span>
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center">
                    {formData.passportPhoto ? (
                      <img
                        src={URL.createObjectURL(formData.passportPhoto)}
                        alt="Паспорт"
                        className="w-full h-full object-cover rounded-3xl"
                      />
                    ) : (
                      <Icon name="FileText" size={64} className="text-purple-400" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Загрузите фото паспорта</h3>
                  <p className="text-gray-600 mb-6">
                    Сфотографируйте разворот с фото. Убедитесь, что все данные читаемы.
                  </p>
                </div>

                <div className="border-2 border-dashed border-purple-300 rounded-2xl p-8 text-center bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="passport-upload"
                  />
                  <label htmlFor="passport-upload" className="cursor-pointer">
                    <Icon name="Upload" size={48} className="mx-auto mb-4 text-purple-600" />
                    <p className="text-lg font-semibold text-gray-900 mb-2">
                      {formData.passportPhoto ? formData.passportPhoto.name : 'Нажмите для загрузки'}
                    </p>
                    <p className="text-sm text-gray-600">или перетащите файл сюда</p>
                  </label>
                </div>

                <div className="bg-blue-50 rounded-2xl p-4 flex items-start gap-3">
                  <Icon name="Info" className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <p className="text-sm text-gray-700">
                    Фото должно быть четким, все данные читаемы. Принимаются форматы: JPG, PNG
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={prevStep}
                    variant="outline"
                    className="flex-1 h-16 rounded-2xl text-lg font-semibold"
                  >
                    <Icon name="ArrowLeft" className="mr-2" size={20} />
                    Назад
                  </Button>
                  <Button
                    onClick={nextStep}
                    disabled={!formData.passportPhoto}
                    className="flex-1 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-lg font-semibold"
                  >
                    Далее
                    <Icon name="ArrowRight" className="ml-2" size={20} />
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Способ получения денег</h3>
                  <RadioGroup
                    value={formData.transferMethod}
                    onValueChange={(value) => handleInputChange('transferMethod', value)}
                    className="space-y-3"
                  >
                    <div
                      className={`flex items-center space-x-3 border-2 rounded-2xl p-4 cursor-pointer transition-all ${
                        formData.transferMethod === 'card'
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <Icon name="CreditCard" className="text-white" size={24} />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">На банковскую карту</div>
                            <div className="text-sm text-gray-600">Перевод за 5 минут</div>
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div
                      className={`flex items-center space-x-3 border-2 rounded-2xl p-4 cursor-pointer transition-all ${
                        formData.transferMethod === 'phone'
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <RadioGroupItem value="phone" id="phone" />
                      <Label htmlFor="phone" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                            <Icon name="Smartphone" className="text-white" size={24} />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">По номеру телефона</div>
                            <div className="text-sm text-gray-600">Быстрый перевод</div>
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div
                      className={`flex items-center space-x-3 border-2 rounded-2xl p-4 cursor-pointer transition-all ${
                        formData.transferMethod === 'sbp'
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <RadioGroupItem value="sbp" id="sbp" />
                      <Label htmlFor="sbp" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                            <Icon name="Zap" className="text-white" size={24} />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">Через СБП</div>
                            <div className="text-sm text-gray-600">Мгновенный перевод</div>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.transferMethod === 'card' && (
                  <div>
                    <Label className="text-gray-700 mb-2 block">Номер карты*</Label>
                    <Input
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      className="h-14 rounded-2xl bg-purple-50 border-none text-lg"
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                    />
                  </div>
                )}

                {formData.transferMethod === 'phone' && (
                  <div>
                    <Label className="text-gray-700 mb-2 block">Номер телефона*</Label>
                    <Input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      className="h-14 rounded-2xl bg-purple-50 border-none text-lg"
                      placeholder="+7"
                    />
                  </div>
                )}

                {formData.transferMethod === 'sbp' && (
                  <div>
                    <Label className="text-gray-700 mb-2 block">Выберите банк*</Label>
                    <select
                      value={formData.sbpBank}
                      onChange={(e) => handleInputChange('sbpBank', e.target.value)}
                      className="w-full h-14 rounded-2xl bg-purple-50 border-none text-lg px-4"
                    >
                      <option value="">Выберите банк</option>
                      <option value="sber">Сбербанк</option>
                      <option value="tinkoff">Тинькофф</option>
                      <option value="vtb">ВТБ</option>
                      <option value="alpha">Альфа-Банк</option>
                      <option value="raiffeisen">Райффайзен</option>
                    </select>
                  </div>
                )}

                <div className="bg-green-50 rounded-2xl p-4 flex items-start gap-3">
                  <Icon name="CheckCircle" className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Ваша заявка почти готова!</p>
                    <p className="text-sm text-gray-700">
                      После отправки мы обработаем заявку в течение 15 минут
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={prevStep}
                    variant="outline"
                    className="flex-1 h-16 rounded-2xl text-lg font-semibold"
                  >
                    <Icon name="ArrowLeft" className="mr-2" size={20} />
                    Назад
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-lg font-semibold"
                  >
                    Отправить заявку
                    <Icon name="Send" className="ml-2" size={20} />
                  </Button>
                </div>
              </div>
            )}
          </div>

          <p className="text-center text-white/70 text-sm mt-6">
            *Если вы хотите изменить номер телефона, привязанный к вашему личному кабинету,
            <br />
            свяжитесь с нашим специалистом по телефону: 8 (800) 555-35-35
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoanApplicationForm;
