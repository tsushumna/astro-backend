Napi::Function func = DefineClass(env, "ClassExample", 
{
  InstanceMethod("add", &ClassExample::Add),
  InstanceMethod("getValue", &ClassExample::GetValue),
});
constructor = Napi::Persistent(func);
Napi::Value ClassExample::Add(const Napi::CallbackInfo& info) 
{
  Napi::Env env = info.Env();
  Napi::HandleScope scope(env);
  
  if (info.Length() != 1 || !info[0].IsNumber()) {
     Napi::TypeError::New(env, "Numberexpected").ThrowAsJavaScriptException();
  }
  Napi::Number toAdd = info[0].As<Napi::Number>();
  double answer = this->actualClass_->add(toAdd.DoubleValue());
  return Napi::Number::New(info.Env(), answer);
}